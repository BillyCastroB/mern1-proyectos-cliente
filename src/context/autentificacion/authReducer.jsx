
import { REGISTRO_ERROR, REGISTRO_EXITOSO, LOGIN_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, CERRAR_SESION } from "../../types/type";

export const authReducer = (state, action)=>{
    switch(action.type){
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case LOGIN_EXITOSO: 
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            return{
                ...state,
                token: null,
                mensaje: action.payload,
                cargando: false
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}