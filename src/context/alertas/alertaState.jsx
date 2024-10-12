import React, {useReducer} from 'react'
import { AlertaContext } from './alertaContext'
import { alertaReducer } from './alertaReducer'
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/type'

export const AlertaState = (props) => {

    const initialState = {
        alerta : null
    }

    const [state ,dispatch ] =  useReducer( alertaReducer ,initialState )

    const mostrarALERTA = (msg, categoria)=>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg: msg,
                categoria: categoria
            }
        })
        setTimeout( ()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        },5000)
    }

  return (
    <AlertaContext.Provider
        value={{
            alerta: state.alerta,
            mostrarALERTA
        }}
    >    
        {props.children}
    </AlertaContext.Provider>
  )
}
