import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertaContext } from '../../context/alertas/alertaContext';
import { AuthContext } from '../../context/autentificacion/authContext';

export const Login = () => {
    const navigate = useNavigate();
    
    // Contexto de alertas
    const alertasContext = useContext(AlertaContext);
    const { alerta, mostrarALERTA } = alertasContext;

    // Contexto de autenticación
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    // Redirección si autenticado es true
    useEffect(() => {
        if (autenticado) {
            navigate('/proyectos');
        }
        if (mensaje) {
            mostrarALERTA(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, navigate]); // Ya no necesitas `props.history`

    // State para login
    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });
    const { email, password } = usuario;

    // Función para actualizar el state con los inputs
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Función para enviar el formulario
    const onSubmit = (e) => {
        e.preventDefault();
        // Validación de campos vacíos
        if (email.trim() === '' || password.trim() === '') {
            mostrarALERTA('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        // Ejecuta la función iniciarSesion del contexto
        iniciarSesion({ email, password });
    };

    return (
        <div className='form-usuario'>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className='contenedor-form sombra-dark'>
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
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
                    <div>
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value="Iniciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Crear cuenta
                </Link>
            </div>
        </div>
    );
};
