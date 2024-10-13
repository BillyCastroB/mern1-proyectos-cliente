import React, { useContext } from 'react'
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext';

export const Tarea = ({tarea}) => {
    const tareasContext = useContext(tareaContext);
    const {eliminarTAREA, obtenerTAREAS,actualizarTarea, guardartareaACTUAL } = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const [proyectoActual] = proyecto;

    const onclickEliminar = (id, proyecto)=>{
        eliminarTAREA(id, proyectoActual._id);
        obtenerTAREAS(proyectoActual._id);
    }

    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }

    const seleccionarTarea = (tarea) => {
        guardartareaACTUAL(tarea);
    }

  return (
    <li className='tarea sombra'>
        <p>{tarea.nombre}</p>
        <div className='estado'>
            {tarea.estado? <button 
                type='button' 
                className='completo'
                onClick={()=>cambiarEstado(tarea)}
                >Completo</button> 
            : 
            <button 
                type='button' 
                className='incompleto'
                onClick={()=>cambiarEstado(tarea)}
                >Incompleto</button>   
            }
        </div>
        <div className='acciones'>
            <button
                type='button'
                className='btn btn-primario'
                onClick={()=>seleccionarTarea(tarea)}
            >Editar</button>
            <button
                type='button'
                className='btn btn-secundario'
                onClick={()=>{onclickEliminar(tarea._id)}}
            >Eliminar</button>
        </div>
    </li>
  )
}
