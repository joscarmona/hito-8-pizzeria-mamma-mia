import { createContext, useState } from "react";

/* ****** Creacion del contexto ****** */
export const UserContext = createContext()


/* ****** Proveedor ****** */
const UserProvider = ({children}) => {
    const [token, setToken] = useState(true)

    /* Metodo logout() para cambiar estado del token */
    const logout = () => {
        setToken(false)
    }

    return(
        <UserContext.Provider value={{token, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider