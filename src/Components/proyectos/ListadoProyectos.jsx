import React, { useContext, useEffect } from 'react'
import { Proyecto } from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import { AlertaContext } from '../../context/alertas/alertaContext'
export const ListadoProyectos = () => {

  const proyectosContext = useContext(proyectoContext);
  const {mensaje, proyectos, obtenerPROYECTOS } = proyectosContext;

  const alertontext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertontext
  useEffect( ()=>{
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    obtenerPROYECTOS();
  }, [mensaje] )


  return (
    <ul className='listado-proyectos'>
      { alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
) : null }
        {proyectos.map(proyecto => (
          <Proyecto
            key={proyecto._id}
            proyecto={proyecto}
          />
        ))}
    </ul>
  ) 
}
