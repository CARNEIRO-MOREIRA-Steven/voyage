import { Navigate } from "react-router-dom"
// import { useAuth } from "../contexts/AuthContext"
import { useSelector } from "react-redux"

function ProtectedRoute ({children}) {
    const { user, token } = useSelector((state) => state.auth)

    console.log(`ici cest le role : ${user.role}`)

    // const { isAuthenticated } = useAuth()
    if(!user || !token) {
        return <Navigate to="/login" />
    }

    // Pas admin
    if (user.role !== "admin") {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute