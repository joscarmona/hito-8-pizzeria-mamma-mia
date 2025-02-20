/* ************************************************************ */
/* ************************ COMPONENTE ************************ */

import { Link } from "react-router-dom"

/* ************************************************************ */
const NotFound = () => {
    return (
        <section className="notFoundContainer">
            <article className="articleNotFound">
                <h1 className="h3NotFound">Lo sentimos, la ruta que intentas consultar no existe en este sitio web</h1>
                <p className="pNotFound">
                    Si desea continuar navegando en Pizzería Mamma Mía, por favor hacer click
                    {/* Link a Home, redirije a la ruta "/" */}
                    <Link to="/" style={{textDecoration:"none"}}>
                        <b> aquí</b>
                    </Link>
                </p>
            </article>            
        </section>
    )
}
export default NotFound