import React, {useState, useCallback} from 'react'
import { auth, db } from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = (e) => {
        e.preventDefault()

        if(!email.trim()){
            setError('Ingrese mail')
            return
        }
        if(!password.trim()){
            setError('Ingrese contraseña')
            return
        }
        if(password.length < 6){
            setError('Contraseña debe ser mayor a 6 digitos')
            return
        }

        setError(null)

        if(esRegistro){
            registrar()
        } else {
            login()
        }
    }

    const registrar = useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            console.log(res.user);
            await db.collection('usuarios').doc(res.user.uid).set({
                fechaCreacion: Date.now(),
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid)

            setEmail('')
            setPassword('')
            setError(null)

            // Para cuando se registre se vaya directo a la ruta de admin
            props.history.push('/admin')

        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Correo ingresado NO es valido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Correo existente')
            }
        }

    }, [email, password, props.history])

    const login = useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password)
            console.log(res.user);

            setEmail('')
            setPassword('')
            setError(null)
            
            // Para cuando inicie sesion se vaya directo a la ruta de admin
            props.history.push('/admin')

        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Correo ingresado NO es valido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Correo NO esta registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }
    }, [email, password,props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuario' : 'Iniciar sesión'
                }
            </h3>
            <hr />
            <div className=" row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (                         // cuando se quiere hacer un operador ternario con solo una respuesta
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese su correo"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese su contraseña"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button 
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={()=> setEsRegistro(!esRegistro)}
                            type="button"
                        >
                            {
                                esRegistro ? '¿Ya tiene cuenta?' : '¿No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)