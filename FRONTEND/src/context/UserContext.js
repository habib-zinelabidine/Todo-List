import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext({})

export const ContextProvider = ({children})=>{
    const [loggedin,setloggedin] = useState(false)
    const [token,settoken] = useState(null)
    const [user, setUser] = useState(null)

    const login = ({token,user})=>{
        settoken(token)
        setloggedin(!!token)
        setUser(user)
    }

    return(
    <UserContext.Provider value={{login,loggedin,token, user}}>
            {children}
    </UserContext.Provider>
    )
}