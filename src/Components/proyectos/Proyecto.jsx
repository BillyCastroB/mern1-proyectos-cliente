import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const Proyecto = ({proyecto}) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoACTUAL } = proyectosContext;
  /*  */
  const tareasContext = useContext(tareaContext);
  const {obtenerTAREAS} = tareasContext;

  const seleccionarProyecto = id =>{
    proyectoACTUAL(id);
    obtenerTAREAS(id);
  }

  return (  
    <li>
        <button
            type='button'
            className='btn btn-blank'
            onClick={()=>seleccionarProyecto(proyecto._id)}
        >{proyecto.nombre}
        </button>
    </li>
  )
}

