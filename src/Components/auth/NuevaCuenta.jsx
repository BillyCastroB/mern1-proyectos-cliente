import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AlertaContext } from '../../context/alertas/alertaContext';
import { AuthContext } from '../../context/autentificacion/authContext';

export const NuevaCuenta = (props) => {
    const navigate = useNavigate();
    const alertasContext = useContext(AlertaContext);
    const { alerta, mostrarALERTA } = alertasContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado ,registrarUsuario } = authContext;

    useEffect(()=>{
        if(autenticado){
            navigate('/proyectos');
        }
        if(mensaje){
            mostrarALERTA( mensaje.msg, mensaje.categoria)
        }

    }, [mensaje, autenticado, props.history ])

    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })
    const {nombre, email, password, confirmar} = usuario;
    const onChange = (e)=>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e)=>{
        // validar que no haya campos vacios
        e.preventDefault();
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarALERTA('todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(password.length < 6){
            mostrarALERTA('El password debe ser al menor de 6 caracteres', 'alerta-error')
            return;
        }
        if(password !== confirmar){
            mostrarALERTA('Los passwords no son iguales', 'alerta-error')
            return;
        }
        // paso toda la validacion:
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

  return (
    <div className='form-usuario'>
        {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)  :  null }
        <div className='contenedor-form sombra-dark'>
            <h1>Obtener Cuenta</h1>
            <form 
                onSubmit={onSubmit}
            >
                <div className='campo-form'>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id='nombre'
                        name='nombre'
                        placeholder='Ingrese su Nombre'
                        onChange={onChange}
                        value={nombre} />
                </div>
                <div className='campo-form'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id='email'
                        name='email'
                        placeholder='Ingrese su Email'
                        onChange={onChange}
                        value={email} />
                </div>
                <div className='campo-form'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id='password'
                        name='password'
                        placeholder='Ingrese su Password'
                        onChange={onChange}
                        value={password} />
                </div>
                <div className='campo-form'>
                    <label htmlFor="confirmar">Repetir Password</label>
                    <input 
                        type="password"
                        id='confirmar'
                        name='confirmar'
                        placeholder='Repita su Password'
                        onChange={onChange}
                        value={confirmar} />
                </div>
                <div>
                    <input 
                        type="submit"
                        className='btn btn-primario btn-block'
                        value="Registrar" />
                </div>
            </form>
            <Link to={'/'} className='enlace-cuenta'>
                Volver a Iniciar Sesión
            </Link>
        </div>
    </div>
  )
}
