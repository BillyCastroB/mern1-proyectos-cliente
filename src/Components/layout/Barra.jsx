import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../../context/autentificacion/authContext';
export const Barra = () => {

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = authContext
  useEffect( ()=>{
    usuarioAutenticado();
  }, [] )
  return (
    <header className='app-header'>
        { usuario? <p className='nombre-usuario'>HOLA <span> {usuario.nombre} </span></p> : null }
        
        <nav className='nav-principal'>
            <button 
              className='btn btn-blank cerrar-sesion'
              onClick={() => cerrarSesion()}>
              Cerrar Sesión
            </button>
        </nav>
    </header>
  )
}
