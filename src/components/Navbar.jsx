/************************************************************** */
/* ************************ COMPONENTE ************************ */

import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"

/* FUNCIÓN PARA CALCULAR EL TOTAL A PAGAR */
const total = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.count

/************************************************************** */
const Navbar = () => {
    /* Acceso estado cart definido en Context - Provider CartContext.jsx (en este caso no se utiliza el setter setCart) */
    const {cart} = useContext(CartContext)

    /* VARIABLE INDICA SI EL USUARIO SE ENCUENTRA LOGUEADO O NO */
    // TOKEN = FALSE, INDICA QUE USUARIO NO ESTÁ LOGUEADO Y SE DEBEN MOSTRAR LAS OPCIONES:
    // -- LOGIN Y REGISTER
    // TOKEN = TRUE, INDICA QUE USUARIO ESTÁ LOGUEADO Y SE DEBEN MOSTRAR LAS OPCIONES:
    // -- PROFILE Y LOGOUT
    // const token = true
    /* ****** UserContext ****** */
    const {token, logout} = useContext(UserContext)
    console.log("valor del token:", token)

    return(
        <nav className="navbar">
            {/* NOMBRE DE LA PÁGINA WEB & LAS OPCIONES */}
            <article className="nombre-web-opciones">
                <p>Pizzería Mamma Mía!</p>
                <div className="opciones">
                    {/* UTF-8 EMOJI PIZZA: &#x1F355; */}
                    {/* Link a Home */}
                    <Link to="/" className="link-opcion" >&#x1F355; Home</Link>
                    {/* <a href="" className="link-opcion" >&#x1F355; Home</a> */}
                    {/* SE RENDERIZA LAS OPCIONES DE USUARIO SEGÚN CORRESPONDA */}
                    {token ? <UsarioLogueado logout={logout}/> : <UsarioNoLogueado />}

                </div>
            </article>
            {/* PRECIO TOTAL DE LOS PRODUCTOS AGREGADOS AL CARRO */}
            {/* UTF-8 EMOJI SHOPPING CART: &#128722; */}
            {/* Link a Cart */}
            <Link to="/cart">
                <button className="total-shopping-cart">&#128722; Total: ${
                    /* EL MÉTODO .REDUCE() EJECUTA UN FUNCIÓN REDUCTORA POR CADA ELEMENTO*/
                    /* array.reduce(function(total, currentValue, currentIndex, arr), initialValue) */
                    cart.reduce(total, 0).toLocaleString('es-CL')
                }</button>
            </Link>
        </nav>
    )
}

export default Navbar

/* COMPONENTES UTILIZADOS PARA RENDERIZAR LAS OPCIONES DE USUARIO CUANDO SE ENCUENTRA LOGUEADO O NO */
//RENDERIZA OPCIONES DE USUARIO LOGUEADO
const UsarioLogueado = ({logout}) =>{
    return(
        <>
            {/* UTF-8 EMOJI OPEN LOCK: &#128275; */}
            {/* Link a Profile */}
            <Link to="/profile" className="link-opcion" >&#128275; Profile</Link>
            {/* UTF-8 EMOJI LOCK: &#128274; */}
            {/* <a href="" className="link-opcion" >&#128274; Logout</a> */}
            <button onClick={logout} className="buttonLogoutNavbar">&#128274; Logout</button>
        </>
    )
}

//RENDERIZA OPCIONES DE USUARIO NO LOGUEADO
const UsarioNoLogueado = () =>{
    return(
        <>
            {/* UTF-8 EMOJI LOCK WITH KEY: &#x1F355; */}
            {/* Link a LoginPage */}
            <Link to="/login" className="link-opcion">&#128272; Login</Link>
            {/* UTF-8 EMOJI LOCK WITH KEY: &#x1F355; */}
            {/* Link a RegisterPage */}
            <Link to="/register" className="link-opcion">&#128272; Register</Link>
        </>
    )
}
/******************************************************************* */