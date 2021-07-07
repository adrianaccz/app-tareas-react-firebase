import React, {useEffect, useState} from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Perfil = (props) => {

    const [user, setUser] = useState(null)

    // Para acceder a datos de usuario ( nos trae informacion del usuario)
    useEffect(() => {
        if(auth.currentUser){
            console.log('Existe usuario');

            setUser(auth.currentUser)
        } else {
            console.log('No existe usuario');

            // Cuando ususario no exista redirigir al login
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div className="container mt-5">
            <h2>Bienvenid@</h2>
            {
                user && (
                    <h3>{user.email}</h3>
                )
            }
        </div>
    )
}

export default withRouter(Perfil)
