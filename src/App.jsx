
import React, {useState, useEffect} from 'react'
import { Formulario } from './components/Formulario'
import { MostrarTareas } from './components/MostrarTareas'
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import { Inicio } from './components/Inicio';
import Perfil from './components/Perfil';
import {auth} from './firebase'
import Footer from './components/Footer';

function App() {

  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [tarea, setTarea] = useState('')
  const [id, setID] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [date, setDate] = useState('')

  // Para verificar si existe o no el usuario, si cierra sesion esta funcion se vuelve a ejecutar
  const [firebaseUser, setFirebaseUser] = useState(false)

useEffect(() => {
  auth.onAuthStateChanged(user => {
    console.log(user);

    if(user){
      setFirebaseUser(user)
    } else {
      setFirebaseUser(null)
    }
  })
}, [])

  return firebaseUser !== false ? (

    <Router>

      <div >
        <Navbar firebaseUser={firebaseUser}/>

        <Switch>

          <Route path="/login">
            <Login/>
          </Route>

        <Route path="/tareas">
          <MostrarTareas 
            tareas={tareas} 
            setTareas={setTareas} 
            setTarea={setTarea}
            setModoEdicion={setModoEdicion}
            setID={setID}
            setDescripcion={setDescripcion} 
            setDate={setDate} 
            user={firebaseUser}
          />
          <Formulario 
            tarea={tarea} 
            setTarea={setTarea} 
            setTareas={setTareas} 
            tareas={tareas}
            modoEdicion={modoEdicion}
            setModoEdicion={setModoEdicion}
            setID={setID}
            id={id}
            descripcion={descripcion} 
            setDescripcion={setDescripcion} 
            date={date} 
            setDate={setDate} 
            user={firebaseUser}
          />
        </Route>

        <Route path="/admin">
            <Perfil/>
        </Route>

        <Route path="/">
          <Inicio/>
        </Route>
        
        </Switch>

        <Footer/>
        
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
