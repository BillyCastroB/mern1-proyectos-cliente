import React, { useState, useContext } from 'react'
import { Tarea } from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const ListadoTareas = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarPROYECTO } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    if(!proyecto){
        return(
            <h2>Selecciona un proyecto</h2>
        )
    }

    const [proyectoActual] = proyecto;

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className='listado-tareas'>
                {(!tareasproyecto || tareasproyecto.length === 0) ? (
                    <p>No hay Tareas</p>
                ) : (
                    tareasproyecto.map(tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea}
                        />
                    ))
                )}
            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => eliminarPROYECTO(proyectoActual._id)}
            >
                Eliminar Proyecto &times;
            </button>
        </>
    );
}
