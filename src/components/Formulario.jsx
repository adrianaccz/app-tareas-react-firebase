import React, {useEffect} from 'react'
import {db} from '../firebase'

export const Formulario = (props) => {

    const {tareas, setTareas, modoEdicion, tarea, setTarea, setID, id, setModoEdicion, descripcion, setDescripcion, date, setDate} = props

    //const [tarea, setTarea] = useState('')
    //const [descripcion, setDescripcion] = useState('')
    //const [date, setDate] = useState('')

    useEffect(() => {
        setTarea('')
        setDescripcion('')
        setDate('')
    }, [setDate, setDescripcion, setTarea])

    const agregar = async (e) => {
        e.preventDefault()
        
        //validaciones
        if(!tarea.trim()){
            console.log('esta vacio');
            return
        }

        try {
        
            const nuevaTarea = {
                name: tarea,
                fecha: date,
                descripcion: descripcion
            }
    
            const data = await db.collection(props.user.uid).add(nuevaTarea)
    
            setDate('')
            setDescripcion('')
            setTarea('')
            setTareas([
                ...tareas,
                { ...nuevaTarea, id: data.id }
            ])
    
        } catch (error) {
            console.log(error);
        }

        console.log(tarea);
    }

    const editar = async (e) => {
        e.preventDefault()
        if(!tarea.trim()){
            return
        }
        try {
            
            await db.collection(props.user.uid).doc(id).update({
                name: tarea,
                fecha: date,
                descripcion: descripcion
            })

            const arrayTareas = tareas.map(item => (
                item.id === id ? { id: item.id, fecha: date, name: tarea, descripcion: descripcion } : item
            ))

            setTareas(arrayTareas)
            setModoEdicion(false)
            setTarea('')
            setID('')
            setDescripcion('')
            setDate('')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="container mt-3">
            <hr />
            <div className="row justify-content-center" >
                <div className="col-md-4">
                <h3 className="text-center">
                    {
                        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                    }
                </h3>
                <form onSubmit={
                    modoEdicion ? editar : agregar
                }>
                    <input 
                        type="text"
                        placeholder="Nombre del ramo"
                        className="form-control mb-2"
                        onChange={e => setTarea(e.target.value)}
                        value={tarea}
                    />
                    <textarea 
                        type="text"
                        placeholder="Descripción de tarea"
                        className="form-control mb-2"
                        onChange={e => setDescripcion(e.target.value)}
                        value={descripcion}
                    ></textarea>
                    <input 
                        type="date"
                        className="form-control mb-2"
                        onChange={e => setDate(e.target.value)}
                        value={date}
                    />
                    <button 
                        className={
                            modoEdicion ? 'btn btn-warning btn-block mb-5' : 'btn btn-dark btn-block mb-5'
                        }
                        type="submit"
                    >
                        {
                        modoEdicion ? 'Editar' : 'Agregar'
                        }
                    </button>
                </form>
                </div>
            </div>
        </div>
        </div>
    )
}
