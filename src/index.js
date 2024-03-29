import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './components/homepage';
import Perfil from './components/perfil';
import Register from './components/LoginRegister/register';
import Login from './components/LoginRegister/login';
import ForoMain from './components/Foros/ForoMain';
import ForoDetalle from './components/Foros/ForoDetalle';
import DetallePerfil from './components/DetallePerfil';
import Solicitar from './components/contaminantes/solicitar';
import Revision from './components/contaminantes/revision';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/Perfil" element={ <Perfil/> } />
        <Route path="/Register" element={ <Register/> } />
        <Route path="/Login" element={ <Login/> } />
        <Route path="/ForoMain" element={ <ForoMain/> } />
        <Route path="/ForoDetalle" element={ <ForoDetalle/> } />
        <Route path="/detallePerfil" element={ <DetallePerfil/> } />
        <Route path="/solicitar" element={ <Solicitar/> } />
        <Route path="/Revision" element={ <Revision/> } />
      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();