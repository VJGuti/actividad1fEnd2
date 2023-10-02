import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Componente Producto
class Producto extends React.Component {
  render() {
    const { producto, eliminarProducto, iniciarModificacion } = this.props;

    // Verifica que el producto tenga las propiedades necesarias
    if (!producto || !producto.nombre) {
      return <div className="error">Producto inválido</div>;
    }

    return (
      <div className="producto">
        {producto.nombre}
        <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        <button onClick={() => iniciarModificacion(producto)}>Modificar</button>
      </div>
    );
  }
}

// Componente ListaProductos
class ListaProductos extends React.Component {
  render() {
    const { productos, filtro, eliminarProducto, iniciarModificacion } = this.props;

    // Verifica que los productos sean un array
    if (!Array.isArray(productos)) {
      return <div className="error">Los productos deben ser un array</div>;
    }

    return (
      <div>
        {productos
          .filter(producto => producto.nombre.includes(filtro))
          .map(producto => (
            <Producto key={producto.id} producto={producto} eliminarProducto={eliminarProducto} iniciarModificacion={iniciarModificacion} />
          ))}
      </div>
    );
  }
}

// Componente App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
        // Agrega más productos aquí
      ],
      filtro: '',
      productoAModificar: null,
    };
  }

  agregarProducto = producto => {
    // Verifica que el producto sea válido antes de agregarlo
    if (!producto || !producto.nombre) {
      console.error('Intentaste agregar un producto inválido');
      return;
    }

    this.setState(prevState => ({ productos: [...prevState.productos, producto] }));
  };

  eliminarProducto = id => {
    this.setState(prevState => ({ productos: prevState.productos.filter(producto => producto.id !== id) }));
  };

  iniciarModificacion = producto => {
    this.setState({ productoAModificar: producto });
  };

  modificarProducto = (id, nuevoNombre) => {
    this.setState(prevState => ({
      productos: prevState.productos.map(producto => (producto.id === id ? { ...producto, nombre: nuevoNombre } : producto)),
      productoAModificar: null,
    }));
  };

  buscarProducto = e => {
    this.setState({ filtro: e.target.value });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/productos">
            <input type="text" onChange={this.buscarProducto} />
            {this.state.productoAModificar ? (
              <form onSubmit={e => { e.preventDefault(); this.modificarProducto(this.state.productoAModificar.id, e.target.producto.value); }}>
                <input name="producto" defaultValue={this.state.productoAModificar.nombre} />
                <button type="submit">Guardar cambios</button>
              </form>
            ) : null}
            <ListaProductos productos={this.state.productos} filtro={this.state.filtro} eliminarProducto={this.eliminarProducto} iniciarModificacion={this.iniciarModificacion} />
          </Route>
          {/* Agrega más rutas aquí */}
        </Switch>
      </Router>
    );
  }
}

export default App;
