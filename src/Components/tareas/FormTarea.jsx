import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

export const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { 
    tareaseleccionada, 
    errortarea, 
    obtenerTAREAS, 
    agregarTAREA, 
    validarTAREA, 
    actualizarTarea, 
    guardartareaACTUAL 
  } = tareasContext;

  // Estado local para la tarea
  const [tarea, setTarea] = useState({
    nombre: ''
  });

  // Destructuring del nombre de la tarea
  const { nombre } = tarea;

  // Efecto para detectar si hay una tarea seleccionada y rellenar el formulario
  useEffect(() => {
    if (tareaseleccionada) {
      setTarea(tareaseleccionada);  // Cargar la tarea seleccionada en el formulario
    } else {
      setTarea({ nombre: '' });  // Limpiar el formulario si no hay tarea seleccionada
    }
  }, [tareaseleccionada]);

  // Si no hay proyecto seleccionado, no mostrar nada
  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handelChange = e => {
    setTarea({
      ...tarea, 
      [e.target.name]: e.target.value
    });
  };

  const onSubmitTarea = e => {
    e.preventDefault();

    // Validar el campo
    if (nombre.trim() === '') {
      validarTAREA();
      return;
    }

    // Si es edición o es nueva tarea
    if (tareaseleccionada) {
      // Actualizar tarea existente
      actualizarTarea(tarea);
    } else {
      // Agregar nueva tarea
      tarea.estado = false;
      tarea.proyecto = proyectoActual._id;
      agregarTAREA(tarea);
    }

    // Obtener las tareas del proyecto actual
    obtenerTAREAS(proyectoActual._id);

    // Reiniciar el formulario
    setTarea({ nombre: '' });

    // Limpiar la tarea seleccionada (opcional)
    guardartareaACTUAL(null);
  };

  return (
    <div className='formulario'>
      <form onSubmit={onSubmitTarea}>
        <div className='contenedor-input'>
          <input 
            type="text"
            className='input-text'
            placeholder={tareaseleccionada ? 'Editar Tarea...' : 'Nueva Tarea...'}
            name='nombre'
            value={nombre}
            onChange={handelChange}
          />
        </div>
        <div className='contenedor-input'>
          <input 
            type="submit"
            className='btn btn-primario btn-block'
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {errortarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null}
    </div>
  );
};
