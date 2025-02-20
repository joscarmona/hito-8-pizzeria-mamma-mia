import { useState } from "react"

/************************************************************** */
/* ************************ COMPONENTE ************************ */
/************************************************************** */
const LoginPage = () => {
    /* ESTADO DEL FORMULARIO LOGIN */
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    /* LOGIN SUCCESSFUL */
    const [loginOk, setLoginOK] = useState (false)

    /* ESTADO DE LOS ERRORES */
    const [errorMessage, setErrorMessage] = useState('')

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

    /* VALIDA LOS DATOS INGRESADOS EN EL FORMULARIO LOGIN */
    const handleSubmit = (e) => {
        // PREVIENE COMPORTAMIENTO POR DEFECTO
        e.preventDefault()

        // VALIDACIÓN CAMPOS VACÍOS
        if (!user.email.trim() || !user.password.trim()) {
            setLoginOK(false)
            setErrorMessage('Todos los campos son obligatorios')
            return
        }

        // VALIDACIÓN EMAIL
        // regex para validar el mail -- invalid@invalid.com
        if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            setLoginOK(false)
            setErrorMessage('El email no es válido')
            return
        }

        // VALIDACIÓN DEL LARGO DEL PASSWORD, AL MENOS 6 CARACTERES
        if (user.password.length < 6) {
            setLoginOK(false)
            setErrorMessage('El password debe tener al menos 6 caracteres')
            return
        }

        // REINICIO DE LOS ESTADOS UNA VEZ SE ENVÍE LOS DATOS INGRESADOS CORRECTAMENTE EN EL FORMULARIO LOGIN
        setErrorMessage('')
        setUser({
            email: '',
            password: ''
        })

        // INDICA LOGIN EXITOSO
        setLoginOK(true)
    }

    return(
        <main className="main-section">
            <h1>Login</h1>
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
                    type="text" 
                    id="password" 
                    value={user.password} 
                    className="register-login-form-inputs" 
                    placeholder="Password" 
                    onChange={handleChange}
                />

                {/* ERROR MESSAGE */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* LOGIN SUCCESSFUL - MESSAGE */}
                {loginOk && <p>Ha iniciado sesión exitosamente!</p>}

                {/* SUBMIT BUTTON */}
                <button type="submit" className="register-login-button">Login</button>
            </form>
        </main>
    )
}

export default LoginPage