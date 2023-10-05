import React from 'react';
import { Link } from 'react-router-dom';


function navegacion() {
  return (

    <nav className="navbar">
      <div className="logo">
        <a href="#">Mi Sitio</a>
      </div>
      <ul className="nav-links">
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/crear">Crear Menus</Link></li>
        <li><Link to="/recetas">Recetas</Link></li>
        <li><Link to="/compras">compras</Link></li>
      </ul>
    </nav>
  );
}
export default navegacion;