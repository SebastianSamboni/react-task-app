import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const { user, isAuthenticated } = useContext(AuthContext)

    if(!isAuthenticated) return <Navigate to='/login' replace />
    
    return <Outlet/>
}

export default ProtectedRoute
