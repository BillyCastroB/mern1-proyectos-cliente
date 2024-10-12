import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/autentificacion/authContext';

export const RutaPrivada = () => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado } = authContext;

  useEffect(() => {
    if (autenticado === null) {
      usuarioAutenticado(); // Verifica si el usuario está autenticado solo si no está definido
    }
  }, []);

  // Asume que el usuario está autenticado si ya existe token, mientras se realiza la verificación
  return autenticado ? <Outlet /> : <Navigate to="/" />;
};
