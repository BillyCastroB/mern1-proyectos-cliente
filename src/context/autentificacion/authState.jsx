import React, { useContext, useReducer } from 'react'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'
import { REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types/type';
import clienteAxios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';

export const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: localStorage.getItem('token') ? true : null, // Autenticado si ya hay token
        usuario: null,
        mensaje: null,
        cargando: !localStorage.getItem('token') // Solo cargando si no hay token
    };
    const [state, dispatch ] = useReducer( authReducer,initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/usuarios', datos);
            console.log(respuesta.data);
            // localStorage.setItem('token', respuesta.data.token);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/auth');
            console.log(respuesta);
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
    
    const iniciarSesion = async (datos)=>{
        try {
            const respuesta = await clienteAxios.post('/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }
    const cerrarSesion = ()=>{
        dispatch({
            type: CERRAR_SESION       
        })
    }
  return (
    <AuthContext.Provider
        value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
        }}
    >
        {props.children}
    </AuthContext.Provider>
  )
}
