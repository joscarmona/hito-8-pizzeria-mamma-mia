import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ****** Creacion del contexto ****** */
export const UserContext = createContext()


/* ****** Proveedor ****** */
const UserProvider = ({children}) => {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const navigate = useNavigate()
    /* ESTADO DEL FORMULARIO LOGIN & REGISTER*/
    // Para almacenar los campos de entrada
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    /* ESTADO DE LOS ERRORES */
    const [errorMessage, setErrorMessage] = useState('')


    /* Método de login */
    const login = async (url) => {
        // REINICIO DE LOS ESTADOS UNA VEZ SE ENVÍE LOS DATOS INGRESADOS CORRECTAMENTE EN EL FORMULARIO LOGIN
        setErrorMessage('')
        setUser({
            email: '',
            password: ''
        })

        // Petición POST a la ruta /api/auth/login con el email & el password
        const { email, password } = user
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                email,
                password,
            })
        })
        // Almacenar el token JWT en el localStorage & Validar email y password ingresado por el usuario
        const data = await response.json()
        data?.error ? setErrorMessage(data?.error) : setisAuthenticated(true)        
        localStorage.setItem("token", data.token)
    }

    /* Método register */
    const register = async (url) => {
        // REINICIO DE LOS ESTADOS UNA VEZ SE ENVÍE LOS DATOS INGRESADOS CORRECTAMENTE EN EL FORMULARIO LOGIN
        setErrorMessage('')
        setUser({
            email: '',
            password: ''
        })

        // Petición POST a la ruta /api/auth/register con el email & el password
        const { email, password } = user
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })

        // Almacenar el token JWT en el localStorage & Validar email y password registrado
        const data = await response.json()
        data?.error ? setErrorMessage(data?.error) : setisAuthenticated(true)        
        localStorage.setItem("token", data.token)
    }

    /* Método profile */
    const profile = async (url, token) => {
        // Se hace una petición GET a la ruta /api/auth/me con el token JWT en el encabezado
        fetch(url, {
            headers: { Authorization: `Bearer ${token}`,},
        })
        .then((response) => response.json())
        // Se almacena la información del usuario en el estado user
        .then((data) => setUser(data))
    }

    /* Metodo logout() para cambiar estado del token (identifica si el usuario se encuentra logueado o no) y se remueve el token del localStorage*/
    const logout = () => {
        setisAuthenticated(false)
        localStorage.removeItem("token")
        user.email = ''
    }

    return(
        // <UserContext.Provider value={{token, isAuthenticated, logout}}>
        <UserContext.Provider 
            value={{
                    isAuthenticated,
                    setisAuthenticated,
                    login,
                    logout,
                    user,
                    setUser,
                    errorMessage,
                    setErrorMessage,
                    register,
                    profile
                }}>
                    {children}
        </UserContext.Provider>
    )
}

export default UserProvider