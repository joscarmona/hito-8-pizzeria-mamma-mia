import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";


/* PARA CONSULTAR A LA API POR PIZZAS POR LA INFORMACIÓN DE LA PIZZA */
const getPizza = async (setPizza, setMyError,id) => {
    try {
        /* ENPOINT DE LA API PIZZAS */
        const url = `http://localhost:5000/api/pizzas/${id}`
        const response = await fetch(url)
        // console.log(response)
        if (!response.ok) { // SE CONSULTA POR EL PROPIEDAD ok DE response
            throw new Error(`Hubo un error en la consulta a la API - Status: ${response.status}`);
            
        }
        // SI response.ok = true, PASA DEFINIR LO SIGUIENTE
        const dataPizza = await response.json()
        // console.log(dataPizzas)
        if (dataPizza) {
            setPizza(dataPizza)
            setMyError("")
        } else { // EN CASO QUE NO HAYA INFORMACION dataPizza
            throw new Error("No data found in API response")                
        }        
    } catch (error) {
        console.error("Error fetching data: ", error)
        setMyError(error.message)   
    }
    
}

/************************************************************** */
/* ********************* COMPONENTE PIZZA ********************* */
/************************************************************** */
const Pizza = () => {
    /* GUARDAR LA CONSULTA REALIZADA LA API DE PIZZAS POR LA INFORMACIÓN DE LA PIZZA*/
    const [pizza, setPizza] = useState({})
    const [myError, setMyError] = useState("")
    const {id} = useParams()

    /* useEffect, SE CONSULTA A LA API CUANDO EL COMPONENTE PIZZA SE MONTA EN App.jsx */
    useEffect(() => {
        getPizza(setPizza, setMyError, id)
    }, [])

    const {img, name, desc, ingredients, price} = pizza

    return (
        <main className="main-section">
            {myError ? <h3 className="errorMessage">Error: {myError}</h3> :
            <section className="cart-container">
                {console.log("enpoint pizzas/p001", pizza)}
                {/* INFROMACIÓN DE LA PIZZA */}
                <div className="infoPizzaContainer">
                    {/* IMAGEN */}
                    <article className="pizzaImageContainer">
                        <img src={img} alt={"pizza " + name} className="pizzaImage"/>
                    </article>
                    {/* NOMBRE, DESCRIPCIÓN, INGREDIENTES, PRECIO */}
                    <article className="pizzaNamDescIngPricContainer">
                        {/* NOMBRE */}
                        <h3 className="pizza-name">{"Pizza " + name}</h3>
                        {/* DESCRIPCIÓN */}
                        <p className="pizzaDescription">{desc}</p>
                        {/* INGREDIENTS */}
                        <div>
                            <p className="">Ingredientes:</p>
                            <ul>
                                {ingredients?.map((ing) => <li key={ing} className="ingredientsLi">&#127829; {ing}</li>)}
                            </ul>
                        </div>
                        {/* PRECIO */}
                        <h2 className="pricePizza">Precio: ${price?.toLocaleString("es-CL")}</h2>


                    </article>
                </div>
                {/* BUTTON AÑADIR AL CARRITO */}
                <button className="button-add-carro">Añadir &#128722;</button>
            </section>}
        </main>
    )
}

export default Pizza