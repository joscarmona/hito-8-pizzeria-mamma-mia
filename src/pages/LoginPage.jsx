import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import handleChangeForm from "../hooks/handleChangeForm"

/************************************************************** */
/* ************************ COMPONENTE ************************ */
/************************************************************** */
const LoginPage = () => {
    /* UserContext */
    const { 
        isAuthenticated,
        login,
        user,
        errorMessage,
        setErrorMessage } = useContext(UserContext)

    /* Custom hook: handleChangeForm */
    const { handleChange } = handleChangeForm("")
    
    /* Endpoint para el login */
    const url = "http://localhost:5000/api/auth/login"

    useEffect(() => {
            /* Se reinicia mensaje de error al cargarse el componente */
            setErrorMessage("")
    }, [])    

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