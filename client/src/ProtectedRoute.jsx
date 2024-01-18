import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const { user, isAuthenticated, loading } = useContext(AuthContext)

    if (loading) return <h1>
        Loading...
    </h1>
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace />
    
    return <Outlet/>
}

export default ProtectedRoute
