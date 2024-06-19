// src/App.js
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { appFirebase } from '../src/pages/firebase-config';
import Login from "./components/Login";
import Home from "./components/Home";
import Categorias from "./pages/Categorias";
import Historial from "./pages/Historial";
import Pagos from "./pages/Pagos";
import Alimentos from "./pages/subPages/Alimentos";
import Entretenimiento from "./pages/subPages/Entretenimiento";
import Servicios from "./pages/subPages/Servicio";
import Transporte from "./pages/subPages/Transporte";
import './App.css';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {usuario ? (
          <Routes>
            <Route path="/" element={<Home correoUsuario={usuario.email} />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/alimentos" element={<Alimentos />} />
            <Route path="/entretenimiento" element={<Entretenimiento />} />
            <Route path="/servicio" element={<Servicios />} />
            <Route path="/transporte" element={<Transporte />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;


