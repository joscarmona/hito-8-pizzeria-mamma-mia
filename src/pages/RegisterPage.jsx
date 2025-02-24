import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import handleChangeForm from "../hooks/handleChangeForm"


/************************************************************** */
/* ************************ COMPONENTE ************************ */
/************************************************************** */
const RegisterPage = () => {
    /* UserContext */
    const { 
        isAuthenticated,
        register,
        user,
        setUser,
        errorMessage,
        setErrorMessage } = useContext(UserContext)

    /* Custom hook: handleChangeForm */
    const { handleChange } = handleChangeForm("")

    /* Endpoint para el register */
    const url = "http://localhost:5000/api/auth/register"
    
    useEffect(() => {
        /* Se reinicia mensaje de error al cargarse el componente */
        setErrorMessage("")
    }, [])

        /* ACTUALIZA ESTADOS DEL FORMULARIO */
    

    /* ENVIAR FORMULARIO REGISTER */
    const handleSubmit = (e) => {
        // PREVIENE COMPORTAMIENTO POR DEFECTO
        e.preventDefault()

        // Método implementado en UserContext.jsx, permite la operación de registro de un usuario
        register(url)       
    }

    return(
        <main className="main-section">
            <h1>Register</h1>
            <form className="register-login-form" onSubmit={handleSubmit}>            
                {/* EMAIl */}
                <label htmlFor="email">Email</label>
                <input
                    type="text" 
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

                {/* REGISTER SUCCESSFUL - MESSAGE */}
                {isAuthenticated && <p>Se ha registrado exitosamente!</p>}

                {/* SUBMIT BUTTON */}
                <button type="submit" className="register-login-button">Register</button>                   
            </form>
            
        </main>
    )
}

export default RegisterPage