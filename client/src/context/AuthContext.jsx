import { createContext, useContext, useState } from "react"
import { registerRequest } from "../api/auht"

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [registerErrors, setRegisterErrors] = useState([])

    const signUp = async user => {
        try{
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setRegisterErrors(error.response.data)
        }
    } 
    return (
        <AuthContext.Provider value={{
            signUp,
            user,
            isAuthenticated,
            registerErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
