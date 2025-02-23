import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

/************************************************************** */
/* ************************ COMPONENTE ************************ */
/************************************************************** */
const LoginPage = () => {
    /* UserContext */
    const { 
        isAuthenticated,
        login,
        user,
        setUser,
        errorMessage } = useContext(UserContext)
    /* Endpoint para el login */
    const url = "http://localhost:5000/api/auth/login"

    /* ACTUALIZA ESTADOS DEL FORMULARIO */
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

    /* ENVIAR FORMULARIO LOGIN */
    const handleSubmit = (e) => {
        // PREVIENE COMPORTAMIENTO POR DEFECTO
        e.preventDefault()

        // Método implementado en UserContext.jsx, permite la operación de iniciar sesión por un usuario previamente registrado
        login(url)
    }

    return(
        <main className="main-section">
            <h1>Login</h1>
            <form className="register-login-form" onSubmit={handleSubmit}>            
                {/* EMAIl */}
                <label htmlFor="email">Email</label>
                <input
                    type="email" 
                    id="email" 
                    value={user.email} 
                    className="register-login-form-inputs" 
                    placeholder="Email" 
                    onChange={handleChange}
                />

                {/* PASSWORD */}
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={user.password} 
                    className="register-login-form-inputs" 
                    placeholder="Password" 
                    onChange={handleChange}
                />

                {/* ERROR MESSAGE */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* LOGIN SUCCESSFUL - MESSAGE */}
                {isAuthenticated && <p>Ha iniciado sesión exitosamente!</p>}

                {/* SUBMIT BUTTON */}
                <button type="submit" className="register-login-button">Login</button>
            </form>
        </main>
    )
}

export default LoginPage