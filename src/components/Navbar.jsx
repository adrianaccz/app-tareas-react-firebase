import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut().then(()=>{
            props.history.push('/login')
        })
    }
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">App Tareas </Link>
            <div>
                <div className="d-flex">

                    {
                        props.firebaseUser === null ? (
                        <NavLink className="btn btn-dark mr-2" to="/" exact> 
                            Inicio
                        </NavLink>) : null
                    }

                    {
                        props.firebaseUser !== null ? (
                            <NavLink className="btn btn-dark mr-2" to="/tareas" >   
                                Tareas
                            </NavLink>
                        ) : null
                    }
                    
                    {/* Si el usuario esta logeado pinta boton de admin, sino lo quita */}
                    {
                        props.firebaseUser !== null ? (
                            <NavLink className="btn btn-dark mr-2" to="/admin" >   
                                Perfil
                            </NavLink>
                        ) : null
                    }
                    
                    {/* Si el usuario esta logeado pinta boton de cerrar sesion, sino pinta el login*/}
                    {
                        props.firebaseUser !== null ? (
                            <button 
                                className="btn btn-dark"
                                onClick={() => cerrarSesion()}
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <NavLink className="btn btn-dark mr-2" to="/login" >   
                                Login
                            </NavLink>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)