import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Componente Producto
function Producto({ producto }) {
  // Verifica que el producto tenga las propiedades necesarias
  if (!producto || !producto.nombre) {
    return <div className="error">Producto inválido</div>;
  }

  return <div className="producto">{producto.nombre}</div>;
}

// Componente ListaProductos
function ListaProductos({ productos, filtro }) {
  // Verifica que los productos sean un array
  if (!Array.isArray(productos)) {
    return <div className="error">Los productos deben ser un array</div>;
  }

  return (
    <div>
      {productos
        .filter(producto => producto.nombre.includes(filtro))
        .map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
    </div>
  );
}

// Componente App
function App() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1' },
    { id: 2, nombre: 'Producto 2' },
    // Agrega más productos aquí
  ]);
  const [filtro, setFiltro] = useState('');

  const agregarProducto = producto => {
    // Verifica que el producto sea válido antes de agregarlo
    if (!producto  || !producto.nombre) {
      console.error('Intentaste agregar un producto inválido');
      return;
    }

    setProductos([...productos, producto]);
  };

  const buscarProducto = e => {
    setFiltro(e.target.value);
  };

  return (
    <Router>
      <Switch>
        <Route path="/productos">
          <input type="text" onChange={buscarProducto} />
          <ListaProductos productos={productos} filtro={filtro} />
        </Route>
        {/* Agrega más rutas aquí */}
      </Switch>
    </Router>
  );
}

export default App;