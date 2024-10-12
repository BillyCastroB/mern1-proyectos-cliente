import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/auth/Login';
import { NuevaCuenta } from './Components/auth/NuevaCuenta';
import { Proyectos } from './Components/proyectos/Proyectos';
import { ProyectoState } from './context/proyectos/proyectoState';
import { TareaState } from './context/tareas/tareaState';
import { AlertaState } from './context/alertas/alertaState';
import { AuthState } from './context/autentificacion/authState';
import tokenAuth from '../config/tokenAuth';
import { RutaPrivada } from './Components/rutas/RutaPrivada';
// revisar si hay un token 
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}
function App() {
  return (
    <ProyectoState>
      <TareaState> 
        <AlertaState>
          <AuthState>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nueva-cuenta" element={<NuevaCuenta />} />
                
                {/* Envuelve el componente Proyectos con la RutaPrivada */}
                <Route path="/proyectos" element={<RutaPrivada />}>
                  <Route path="" element={<Proyectos />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>

  );
}

export default App;
