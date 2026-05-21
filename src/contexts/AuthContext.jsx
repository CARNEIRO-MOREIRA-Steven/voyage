import { createContext, useContext, useEffect, useState } from "react";

// createContext permet de créer un context
// useContext permet d'utiliser le context
// useEffect permet d'executer du code selon le cycle de vie d'une requette ajax par exemple

const AuthContext = createContext();

export function AuthProvider({children}){

    const [ user, setUser ] = useState(null)
    const [ token, setToken ] = useState(null)
    //Null car l'utilisateur n'est pas connecter et on à pa le jeton

    useEffect(() => {
        // récupération dans le localStorage ou sessionStorage

        const savedUser = localStorage.getItem("user")
        const savedToken = localStorage.getItem("token")

        if(savedUser && savedToken) {
            setUser(JSON.parse(savedUser))
            setToken(savedToken)
        }

        
    }, [])

    const login = (userData, accessToken) => {
        // fonction de connexion qui sera appeler lors d'une connexion réussi avec l'api via une requette  ajax
        setUser(userData)
        setToken(accessToken)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", accessToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout,
            isAuthentificate : !!token
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}