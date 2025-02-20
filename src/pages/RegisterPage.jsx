import { useState } from "react"

/************************************************************** */
/* ************************ COMPONENTE ************************ */
/************************************************************** */
const RegisterPage = () => {
    /* ESTADO DEL FORMULARIO REGISTER */
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    /* REGISTER SUCCESSFUL */
    const [registerOk, setRegisterOK] = useState (false)

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

    /* VALIDA LOS DATOS INGRESADOS EN EL FORMULARIO REGISTER */
    const handleSubmit = (e) => {
        // PREVIENE COMPORTAMIENTO POR DEFECTO
        e.preventDefault()

        // VALIDACIÓN CAMPOS VACÍOS
        if (!user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
            setRegisterOK(false)
            setErrorMessage('Todos los campos son obligatorios')
            return
        }

        // VALIDACIÓN EMAIL
        // regex para validar el mail -- invalid@invalid.com
        if (!/^\S+@\S+\.\S+$/.test(user.email)) {
            setRegisterOK(false)
            setErrorMessage('El email no es válido')
            return
        }

        // VALIDACIÓN DEL LARGO DEL PASSWORD, AL MENOS 6 CARACTERES
        if (user.password.length < 6) {
            setRegisterOK(false)
            setErrorMessage('El password debe tener al menos 6 caracteres')
            return
        }

        // VALIDACIÓN PASSWORD Y CONFIRM PASSWORD SEAN IGUALES
        if (user.password != user.confirmPassword) {
            setRegisterOK(false)
            setErrorMessage('Los password no coinciden')
            return
        }

        // REINICIO DE LOS ESTADOS UNA VEZ SE ENVÍE LOS DATOS INGRESADOS CORRECTAMENTE EN EL FORMULARIO REGISTER
        setErrorMessage('')
        setUser({
            email: '',
            password: '',
            confirmPassword: ''
        })

        // INDICA REGISTRO EXITOSO
        setRegisterOK(true)
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
                    type="text" 
                    id="password" 
                    value={user.password} 
                    className="register-login-form-inputs" 
                    placeholder="Password" 
                    onChange={handleChange}
                />

                {/* CONFIRM PASSWORD */}
                <label htmlFor="confirmPassword">Confirm password</label>
                <input 
                    type="text" 
                    id="confirmPassword" 
                    value={user.confirmPassword}
                    className="register-login-form-inputs" 
                    placeholder="Confirm password" 
                    onChange={handleChange}
                />

                {/* ERROR MESSAGE */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* REGISTER SUCCESSFUL - MESSAGE */}
                {registerOk && <p>Se ha registrado exitosamente!</p>}

                {/* SUBMIT BUTTON */}
                <button type="submit" className="register-login-button">Register</button>                   
            </form>
            
        </main>
    )
}

export default RegisterPage