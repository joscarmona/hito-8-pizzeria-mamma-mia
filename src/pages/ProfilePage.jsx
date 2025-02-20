/* Para visualizar en el Navbar el enlace correspondiente a la ruta "/profile" se debe asignar a la variable token el valor booleano true de forma manual (cuando el valor de esta variable es false se muestran los enlaces register y login). La variable token se encuentra declarada en el componente Navbar */


/* ************************************************************ */
/* ************************ COMPONENTE ************************ */
/* ************************************************************ */
const ProfilePage = () => {
    return (
        <main className="mainUserProfile">
            <section className="userProfileContainer">
                <h1 className="h1UserProfile">Perfil de usuario</h1>
                <article className="userInfoContainer">
                    <p>usuario@email.com</p>
                    {/* <button className="logout">Cerrar sesión</button> */}
                </article>
            </section>
        </main>
    )
}
export default ProfilePage