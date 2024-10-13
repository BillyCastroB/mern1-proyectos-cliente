import React, {useReducer} from 'react'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA,ACTUALIZAR_TAREA , ELIMINAR_TAREA, ESTADO_TAREA,TAREA_ACTUAL } from '../../types/type'
import clienteAxios from '../../../config/axios'
export const TareaState = props => {
    
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTAREAS = async (proyecto)=>{
      try {
        const resultado = await clienteAxios.get('/tareas', {params: {proyecto} });
        console.log(resultado);
        dispatch({
          type:TAREAS_PROYECTO,
          payload: resultado.data
        })
      } catch (error) {
        console.log(error)
      } 
    }

    const agregarTAREA = async tarea =>{
      try {
        const resultado = await clienteAxios.post('/tareas', tarea);
        console.log(resultado)
        dispatch({
          type: AGREGAR_TAREA,
          payload: tarea
        })
      } catch (error) {
        console.log(error)
      }
      
    }
    const validarTAREA = ()=>{
      dispatch({
        type: VALIDAR_TAREA
      })
    }
    const eliminarTAREA = async (id, proyecto) =>{
      await clienteAxios.delete(`/tareas/${id}`, {params: {proyecto}} )
      try {
        dispatch({
          type: ELIMINAR_TAREA,
          payload: id
        })
      } catch (error) {
        console.log(error);
      }
    }
    const actualizarTarea = async tarea =>{
      try {
        const resultado = await clienteAxios.put(`/tareas/${tarea._id}`, tarea)
        console.log(tarea);
        dispatch({
          type: ACTUALIZAR_TAREA,
          payload: resultado.data
        })
      } catch (error) {
        console.log(error);
      }
    }
    const guardartareaACTUAL = tarea=>{
      dispatch({
        type: TAREA_ACTUAL,
        payload: tarea
      })
    }
  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTAREAS,
        agregarTAREA,
        validarTAREA,
        eliminarTAREA,
        guardartareaACTUAL,
        actualizarTarea
      }}
    >
      {props.children}
    </tareaContext.Provider>
  )
}
