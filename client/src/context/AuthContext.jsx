import { createContext, useEffect, useState } from "react"
import { loginRequest, registerRequest } from "../api/auht"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [registerErrors, setRegisterErrors] = useState([])

    const signUp = async user => {
        try{
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data)
            setRegisterErrors(error.response.data)
        }
    }

    const signIn = async user => {
        try{
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            if (Array.isArray(error.response.data)) { 
                return setRegisterErrors(error.response.data)
            }
            setRegisterErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [registerErrors])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            user,
            isAuthenticated,
            registerErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}
