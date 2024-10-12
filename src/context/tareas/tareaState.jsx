import React, {useReducer} from 'react'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA,TAREA_ACTUAL } from '../../types/type'
export const TareaState = props => {
    
    const initialState = {
        tareas: [
          { id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
          { id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2},
          { id: 3, nombre: 'Elegir Metodo de Pago', estado: false, proyectoId: 3},
          { id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 1},
          { id: 5, nombre: 'Elegir colores', estado: false, proyectoId: 1},
          { id: 6, nombre: 'Elegir Metodo de Pago', estado: false, proyectoId: 2},
          { id: 7, nombre: 'Elegir Hosting', estado: true, proyectoId: 3},
          { id: 8, nombre: 'Elegir Metodo de Pago', estado: false, proyectoId: 2},
          { id: 9, nombre: 'Elegir Hosting', estado: true, proyectoId: 2}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTAREAS = (proyectoId)=>{
      dispatch({
        type:TAREAS_PROYECTO,
        payload: proyectoId
      })
    }

    const agregarTAREA = tarea =>{
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea
      })
    }
    const validarTAREA = ()=>{
      dispatch({
        type: VALIDAR_TAREA
      })
    }
    const eliminarTAREA = id =>{
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    }
    const modificarESTADO = tarea =>{
      dispatch({
        type: ESTADO_TAREA,
        payload: tarea
      })
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
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTAREAS,
        agregarTAREA,
        validarTAREA,
        eliminarTAREA,
        modificarESTADO,
        guardartareaACTUAL
      }}
    >
      {props.children}
    </tareaContext.Provider>
  )
}
