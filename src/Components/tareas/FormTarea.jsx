import React, {useContext, useState} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { errortarea, obtenerTAREAS, agregarTAREA, validarTAREA } = tareasContext;

  const [tarea, setTarea] = useState({
    nombre: ''
  })

  const {nombre} = tarea;
  if(!proyecto){
    return(
        null
    )
}

const handelChange = e =>{
  setTarea({
    ...tarea, [e.target.name] : e.target.value
  })
}

const [proyectoActual] = proyecto;

const onSubmitTarea = e =>{
  e.preventDefault();
  if(nombre.trim() === ''){
    validarTAREA();
    return;
  }

  tarea.estado = false;
  tarea.proyecto = proyectoActual._id;
  agregarTAREA(tarea);

  obtenerTAREAS(proyectoActual._id);

  setTarea({
    nombre: ''
  })
}

  return (
    <div className='formulario'>
      <form
        onSubmit={onSubmitTarea} 
        className=''>
        <div className='contenedor-input'>
          <input 
            type="text"
            className='input-text'
            placeholder='Nueva Tarea..'
            name='nombre'
            value={nombre}
            onChange={handelChange}
          />
        </div>
        <div className='contenedor-input'>
          <input 
            type="submit"
            className='btn btn-primario btn-block'
            value='Agregar Tarea'
          />
        </div>
      </form>
      {errortarea? <p className='mensaje error'>El nombre de la tarea es obligatorio</p>  :  null } 
    </div>
  )
}
