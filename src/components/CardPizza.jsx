import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from "react-router-dom"

/* ************************************************************ */
/* ************************* CardPizza ************************ */
/* ************************************************************ */
const CardPizza = ({producto}) => {
    /* Acceso estado cart y setter setCart definido en CartContext.jsx */
    const {cart, setCart} = useContext(CartContext)

    /* Estado local, estructura de la pizza a agregar al cart (context) para su utilización en el carro de compras (Cart.jsx) */
    const [pizzaToCart, setPizzaToCart] = useState({
        id: "",
        name: "",
        price: 0,
        count: 0,
        img: ""
    })
    
    /* DESTRUCTURING PRODUCTO (PROPS) */
    // const {name, price, ingredients, img, desc, id} = producto
    const {name, price, ingredients, img, desc, id} = producto

    /* Añadir producto al carro de compras (cart) */
    const addPizzaToCart = (e) => {
        e.preventDefault()
        // Para guardar datos de la pizza
        let newCart1 = {}

        // Cart vacío se agrega pizza al carrito
        if (cart.length === 0) {
            // Guarda los datos de la pizza que se va a agregar al cart
            newCart1 = {...pizzaToCart, id: id, name: name, price: price, img: img}
            console.log("newCart1", newCart1)

            // Incrementa la cantidad de la pizza agregada al cart
            newCart1.count++
            console.log("newCart1.count++: ", newCart1)

            // Actualiza cart
            setCart([newCart1])

        } else {
            console.log("longitud de cart: ", cart.length)
            // Se guarda el contenido de cart (context)
            newCart1 = cart

            // Para identificar si la pizza ya fue agregadada antes al cart (context)
            const index = newCart1.findIndex((elePizza) => elePizza.id === id)
            console.log("id de pizza añadida: ", id)
            console.log("valor de index: ", index)
            console.log("cart no se encuentra vacío, antes del if", newCart1)

            // Pizza se ha agregado antes al cart (context), se incrementa la cantidad en el carrito
            if (index >= 0) { // Pizza agregadada antes al cart, se incrementa la cantidad
                console.log("index encontrado:", index)
                console.log("cart no se encuentra vacío", newCart1)
                
                // Incrementa la cantidad de la pizza agregada al cart
                newCart1[index].count++

                // Actualiza cart
                setCart([...newCart1])
                console.log("se aumenta la cantidad de la pizza de ", name, " en el cart")

            } else if (index === -1) { // Se agrega una nueva pizza al cart
                console.log("index no encontrado: ", index)
                console.log("se agrega una nueva pizza al cart: pizza", name)

                // Guarda los datos de la pizza que se va a agregar al cart
                newCart1 = {...pizzaToCart, id: id, name: name, price: price, img: img}

                // Incrementa la cantidad de la pizza agregada al cart
                newCart1.count++
                console.log(newCart1)

                // Actualiza cart
                setCart([...cart, newCart1])
            }
        }        
    }

    return (
        /* ****** CARD ****** */
        <article className = "card">
            {/* CARD IMAGE */}
            <img src = {img} alt = {"Pizza " + name} className="card-image" />
            {/* CARD BODY */}
            <div className="card-body">
                {/* NOMBRE-DESCRIPCIÓN*/}
                <div className="pizza-name-description">
                    <h3 className="pizza-name">{"Pizza " + name}</h3>
                    <p className="pizza-description">{desc}</p>
                </div>
                {/* INGREDIENTES */}
                <div className="ingredientes">
                    <p>
                        Ingredientes:
                        {/* <br /> */}
                        {/* UTF-8 EMOJI PIZZA: &#x1F355; */}
                        {/* EL MÉTODO .JOIN() CONVIERTE UN ARREGLO A UN STRING */}
                        {/* <span className="span-ingredientes">&#127829; {ingredients.join(", ")}</span> */}
                    </p>
                    <ul className="ingredients-list">
                        {ingredients.map((ing) => <li key={ing} className="ingredients-li">&#127829; {ing}</li>)}
                    </ul>
                </div>                
                {/* PRECIO & BOTONES DE VER MÁS Y AÑADIR AL CARRO DE COMPRAS */}
                <div className="precio-botones">
                    <h2>Precio: ${price.toLocaleString('es-CL')}</h2>
                    <div className="buttons">
                        {/* VER MÁS */}
                        {/* UTF-8 EMOJI EYES: &#128064; */}
                        <Link to={`pizza/${id}`}>
                            <button className="button-ver-mas">Ver más &#128064;</button>
                        </Link>
                        {/* AÑADIR AL CARRO DE COMPRAS */}
                        {/* UTF-8 EMOJI SHOPPING CART: &#128722; */}
                        <button className="button-add-carro" onClick={addPizzaToCart}>Añadir &#128722;</button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CardPizza