import { useContext, useState } from "react"
// import { pizzaCart } from "../pizzas"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"

/* FUNCIÓN PARA CALCULAR EL TOTAL A PAGAR */
const total = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.count

/* FUNCIÓN PARA DECREMENTAR CANTIDAD DE PIZZAS EN EL CARRITO */
const decPizzaCount = (cartLocal, setCartLocal, pizza, cart, setCart) => {
    // Guarda el contenido actual que hay en el carrito de compras
    const newCart = [...cartLocal]

    // Identifica el elemento pizza en el que se desea actualizar los valores de count & price
    const index = newCart.findIndex((elePizza) => elePizza.id === pizza.id)

    // Actualiza los valores de count & price en newCart
    newCart[index].count--
    // Si el valor de count es cero se elimina el elemento actual de newCart
    newCart[index].count <= 0 && newCart.splice(index, 1)
    // newCart[index].price += pizza.price

    // Actualiza estado de cart
    setCartLocal(newCart)

    // Actualizar estado de cart en el Context - Provider
    setCart(newCart)
}

/* FUNCIÓN PARA AUMENTAR CANTIDAD DE PIZZAS EN EL CARRITO */
const incPizzaCount = (cartLocal, setCartLocal, pizza, cart, setCart) => {
    // Guarda el contenido actual que hay en el carrito de compras
    const newCart = [...cartLocal]

    // Identifica el elemento pizza en el que se desea actualizar los valores de count & price
    const index = newCart.findIndex((elePizza) => elePizza.id === pizza.id)

    // Actualiza los valores de count & price en newCart
    newCart[index].count++
    // newCart[index].price += pizza.price

    // Actualiza estado local de cart
    setCartLocal(newCart)

    // Actualizar estado de cart en el Context - Provider
    setCart(newCart)
}

/************************************************************** */
/* *********** COMPONENTE CART (CARRITO DE COMPRAS) *********** */
/************************************************************** */
const Cart = () => {
    /* Acceso estado cart y setter setCart definido en Context - Provider CartContext.jsx */
    const {cart, setCart} = useContext(CartContext)

    /* ****** UserContext ****** */
    const {token} = useContext(UserContext)

    /* ESTADO PARA MANIPULAR EL ARREGLO DE PIZZAS EN EL CARRITO DE COMPRAS */
    // const [cartLocal, setCartLocal] = useState(pizzaCart)
    const [cartLocal, setCartLocal] = useState(cart)

    {/* RENDERIZAR LA INFORMACIÓN DE CADA PIZZA QUE SE ENCUENTRA EN EL CARRITO DE COMPRAS */}
    const renderPizzaInCart = (pizza) => {
        /* Desestructuración de pizza*/
        const {id, name, price, count, img} = pizza
        return <li key={id} className="cart-pizza">
            {/* IMAGEN DE LA PIZZA Y NOMBRE */}
            <article className="pizza-img-name-container">
                {/* IMAGEN DE LA PIZZA */}
                <img src={img} alt= {"Pizza " + name} className="cart-pizza-image"/>
                {/* NOMBRE DE LA PIZZA */}
                <p>{"Pizza " + name}</p>
            </article>
            {/* PRECIO - BOTONES DE INC & DEC - CANTIDAD DE PIZZAS EN EL CARRITO */}
            <article className="pizza-price-count-container">
                {/* PRECIO DE LA PIZZA */}
                <p>{"$" + price.toLocaleString('es-CL')}</p>
                {/* <p>{"$" + pizzaPrice.toLocaleString('es-CL')}</p> */}
                {/* BOTÓN DE DECREMENTAR, PERMITE DISMINUIR LA CANTIDAD DE PIZZAS EN EL CARRITO Y SI LA CANTIDAD ES CERO ELIMINA LA PIZZA DEL CARRITO */}
                <button className="dec-button" onClick={() => decPizzaCount(cartLocal, setCartLocal, pizza, cart, setCart)}>-</button>
                {/* MUESTRA LA CANTIDAD DE PIZZAS EN EL CARRITO */}
                {/* <p>{count}</p> */}
                {}
                <p>{count}</p>
                {/* BOTÓN DE INCREMENTAR, PERMITE AUMENTAR LA CANTIDAD DE PIZZAS EN EL CARRITO */}
                <button className="inc-button" onClick={() => incPizzaCount(cartLocal, setCartLocal, pizza, cart, setCart)}>+</button>
            </article>
        </li>
    }

    return (
        <main  className="main-section">
            <section className="cart-container">
                <h2>Detalles del pedido</h2>
                {/* PRODUCTOS A COMPRAR */}
                <ul className="products-to-buy">
                    {/* SE RENDERIZA LA INFORMACIÓN DE CADA PIZZA QUE SE ENCUENTRA EN EL CARRITO DE COMPRAS */}
                    {cartLocal.map(renderPizzaInCart)}
                    {/* ************************************ */}
                    
                    {/* ************************************ */}
                </ul>
                {/* TOTAL A PAGAR */}
                <h2>
                    Total: ${
                        /* EL MÉTODO .REDUCE() EJECUTA UN FUNCIÓN REDUCTORA POR CADA ELEMENTO*/
                        /* array.reduce(function(total, currentValue, currentIndex, arr), initialValue) */
                        // pizzaCart.reduce(total, 0).toLocaleString('es-CL')
                        cart.reduce(total, 0).toLocaleString('es-CL')
                    }
                </h2>
                {/* IR A PAGAR */}
                {token && <button className="button-add-carro">Pagar</button>}
                

            </section>
        </main>
    )
}

export default Cart