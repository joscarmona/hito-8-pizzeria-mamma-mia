import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"



/* ************************************************************ */
/* ************************ COMPONENTE ************************ */
/* ************************************************************ */
const ProfilePage = () => {
    const { profile, user, logout } = useContext(UserContext)
    /* Endpoint para el profile */
    const url = "http://localhost:5000/api/auth/me"

    /* Se utiliza el hook useEffect para hacer una petición a la ruta /api/auth/me mediante el método profile al cargar el componente */
    useEffect(() => {
        // Se obtiene el token del localStorage
        const token = localStorage.getItem("token")

        if(token)
            profile(url, token)
    }, [])

    return (
        <main className="mainUserProfile">
            <section className="userProfileContainer">
                <h1 className="h1UserProfile">Perfil de usuario</h1>
                <article className="userInfoContainer">
                    {/* Se muestra el email del usuario si está autenticado, de lo contrario mostramos un mensaje */}
                    {user ? (<p>Email: {user.email}</p>) : (<p>Please login to view your profile</p>)}                    
                    <button className="logout" onClick={logout}>Cerrar sesión</button>
                </article>
            </section>
        </main>
    )
}
export default ProfilePage