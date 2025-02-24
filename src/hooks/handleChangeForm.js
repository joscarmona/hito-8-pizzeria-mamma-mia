import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

/* Custom Hook para la manipulación de los estados en los formularios */
const handleChangeForm = () => {
    /* userContext */
    const { setUser } = useContext(UserContext)

    //const [value, setValue] = useState(initialValue)

    /* Método handleChange */
    const handleChange = (e) => {
        const {id, value} = e.target

        setUser((prevUser) => {
            // SE CHEQUEA ESTADO PREVIO
            console.log("Estado previo: ", prevUser)
            return {
                /* CON EL SPREAD OPERATOR (...) SE PUEDE COPIAR O EXPANDIR ELEMENTOS DE UN OBJETO O DE UN ARREGLO  */
                ...prevUser,
                [id]: value
            }
        })
    }

    return { handleChange }
}

export default handleChangeForm