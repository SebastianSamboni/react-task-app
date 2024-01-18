import { createContext, useEffect, useState } from "react"
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auht"
import Cookies from "js-cookie"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [registerErrors, setRegisterErrors] = useState([])
    const [loading, setLoading] = useState(true)

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

    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            const timer = setTimeout(() => {
                setRegisterErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [registerErrors])

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return
            }
                
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) setIsAuthenticated(false)
                
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            logout,
            user,
            isAuthenticated,
            registerErrors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
