import React, {useEffect} from 'react'
import {db} from '../firebase'


export const MostrarTareas = (props) => {

    const {tareas, setTareas, setModoEdicion, setTarea, setID, setDescripcion, setDate} = props

    // const [tareas, setTareas] = useState([])

    useEffect(() => {

        const obtenerTareas = async () => {

            try {
                
                
                const data = await db.collection(props.user.uid).orderBy('fecha', "asc").get()

                // mapeamos el array de data que vamos a construir
                const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

                console.log(arrayData);

                setTareas(arrayData)

            } catch (error) {
                console.log(error);
            }
        }

        obtenerTareas()

    }, [setTareas, props.user])

    const eliminar = async (id) => {
        try {
            
            await db.collection(props.user.uid).doc(id).delete()
            
            // esto para que devuleva el array filtrado con la tarea que eliminemos
            const arrayFiltrado = tareas.filter(item => item.id !== id)
            setTareas(arrayFiltrado)

        } catch (error) {
            console.log(error);
        }
    }

    //Para que se muestre lo que se va a editar
    const activarEdicion = (item) => {
        setModoEdicion(true)
        setTarea(item.name)
        setDescripcion(item.descripcion)
        setDate(item.fecha)
        
        setID(item.id)
    }

    return (
        <div className="container mt-3 table-responsive-sm">

            <table className="table ">
                <thead className="thead-dark">
                    <tr>
                    
                    <th scope="col">Ramo</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha entrega</th>
                    <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    
                    {
                        tareas.map(item => (
                            <tr key={item.id}>
                                <td >
                                    {item.name}
                                </td>
                                <td >
                                    {item.descripcion}
                                </td>
                                <td className="text-nowrap">
                                    {item.fecha}
                                </td>
                                <td >
                                    <button 
                                        className="btn btn-danger btn-sm float-right mr-4"
                                        onClick={()=> eliminar(item.id)}
                                    > 
                                        Eliminar
                                    </button>
                                    <button 
                                        className="btn btn-warning btn-sm float-right mr-4 mt-1"
                                        onClick={()=> activarEdicion(item)}
                                    > 
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                </tbody>
            </table>
        </div>  
        
    )
}
