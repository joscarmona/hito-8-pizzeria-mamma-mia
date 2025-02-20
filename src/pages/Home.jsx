import CardPizza from "../components/CardPizza"
import Header from "../components/Header"
import { useState, useEffect, useContext } from "react"
import { CartContext } from "../context/CartContext"

/* PARA CONSULTAR A LA API PIZZAS */
const getPizzas = async (setPizzas, setMyError) => {
// async function getPizzas(setPizzas, setMyError) {
    try {
        // URL DE LA API PIZZAS
        const url = "http://localhost:5000/api/pizzas"
        const response = await fetch(url)
        // console.log(response)
        if (!response.ok) { // SE CONSULTA POR EL PROPIEDAD ok DE response
            throw new Error(`Hubo un error en la consulta a la API - Status: ${response.status}`);
            
        }
        // SI response.ok = true, PASA DEFINIR LO SIGUIENTE
        const dataPizzas = await response.json()
        // console.log(dataPizzas)
        if (dataPizzas) {
            setPizzas(dataPizzas)
            // console.log(dataPizzas)
            setMyError("")
        } else { // EN CASO QUE HAYA NO INFORMACION dataPizzas
            throw new Error("No data found in API response")                
        }                        
    } catch (error) {
        console.error("Error fetching data: ", error)
        setMyError(error.message)        
    }
}

/* ************************************************************ */
/* ************************ COMPONENTE ************************ */
/* ************************************************************ */
const Home = () => {
    /* Acceso estado cart y setter setCart definido en Context - Provider CartContext.jsx */
    const {cart, setCart} = useContext(CartContext)

    /* GUARDAR LA CONSULTA REALIZADA LA API PIZZAS */
    const [pizzas,setPizzas] = useState([])
    const [myError, setMyError] = useState("")

    /* useEffect, SE CONSULTA A LA API CUANDO EL COMPONENTE HOME SE MONTA EN App.jsx */
    useEffect(() => {
        getPizzas(setPizzas, setMyError)
    }, [])

    return(
        <main className="home" >
            {/* DESDE EL COMPONENTE HOME SE MOSTRARÁN LOS COMPONENTES HEADER Y CARDPIZZA */}
            <Header />
            <section className="card-container" >
                
                {/* {console.log("Componente HOME montado", pizzas)} */}
                {/* SE RENDERIZA EL COMPONENTE CARDPIZZA */}
                {myError ? <h3 className="errorMessage">Error: {myError}</h3> : pizzas.map((pizza) => <CardPizza key={pizza.id} producto = {pizza}/>)}

                {/* {pizzas.map((pizza) => <CardPizza key={pizza.id} producto = {pizza}/>)}     */}

                {/* {myError && <h3 style={{color: "red"}}>Error: {myError}</h3>} */}

            </section>
        </main>
    )
}

export default Home