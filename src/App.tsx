import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./componentes/menu";
import Crear from "./componentes/crearMenu";
import Recetas from "./componentes/recetas";
import  Navegacion  from "./pages/navegacion";
import  Compras  from "./componentes/compras";



function App() {
  return (

    <div className="">
     
        <Navegacion></Navegacion>


        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/compras" element={<Compras />} />
        </Routes>

    </div>

  );
}

export default App;
