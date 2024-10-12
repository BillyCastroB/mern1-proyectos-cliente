import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
export const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);

    const { formulario,errorformulario ,mostrarFORMULARIO, agregarPROYECTO, mostrarERROR } = proyectosContext;
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })
    const { nombre } = proyecto;

    const onChangeNewProyecto = (e)=>{
        setProyecto({...proyecto, [e.target.name]: e.target.value})
    }
    
    const onSubmitProyectos = (e)=>{
        e.preventDefault();
        // validar
        if(nombre === ''){
            mostrarERROR();
            return;
        }
        // agregar al state
        agregarPROYECTO(proyecto);

        // reiniciar el state
        setProyecto({
            nombre: ''
        });
    }
  return (
    <>
        <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={()=> mostrarFORMULARIO()}
        >Nuevo Proyecto</button>

        {
            formulario? 
                <form 
                onSubmit={onSubmitProyectos}
                className='formulario-nuevo-proyecto'>
                    <input 
                    className='input-text'
                    type="text"
                    placeholder='Nombre Proyecto'
                    name='nombre' 
                    value={nombre}
                    onChange={onChangeNewProyecto}
                    />
                    <input 
                        type="submit" 
                        className='btn btn-block btn-primario'
                        value="Agregar Proyecto" 
                    />
                </form>
            : null
        }
        {  errorformulario? <p className='mensaje error'>El nombre del proyecto es onligatorio</p>  : null }

        
    </>
  )
}
