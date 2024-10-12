import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ERROR,PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from "../../types/type";
import cuid from 'cuid';
import clienteAxios from "../../../config/axios";


export const ProyectoState = props =>{
    
    const inicialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer(proyectoReducer, inicialState);
    // funciones para el crud
    const mostrarFORMULARIO = async ()=>{
        const resultado = clienteAxios.get
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    // obtener proyectos
    const obtenerPROYECTOS = async () =>{
        try {
            const resultado = await clienteAxios.get('/proyectos');
            console.log(resultado)
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            })
        }catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }    
    const agregarPROYECTO = async proyecto =>{
        try {
            const resultado = await clienteAxios.post('/proyectos', proyecto);
            console.log(resultado)
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    const mostrarERROR = ()=>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoACTUAL = proyectoId =>{
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    const eliminarPROYECTO = async proyectoID =>{
        try {
            await clienteAxios.delete(`/proyectos/${proyectoID}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoID
            })
        } catch (error) {
            const alerta = {
                msg: "Hubo un error",
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFORMULARIO,
                obtenerPROYECTOS,
                agregarPROYECTO,
                mostrarERROR,
                proyectoACTUAL,
                eliminarPROYECTO
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
