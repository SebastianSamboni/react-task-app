import { createContext, useEffect, useState } from "react"
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auht"
import Cookies from "js-cookie"

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

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get()

            if (cookies.token) {
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    console.log(res)
                    if (!res.data) setIsAuthenticated(false)
                    
                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    console.log(error)
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
        }
        checkLogin()
    }, [])

    useEffect(() => {
        console.log('user: ', user)
        console.log('isAuthenticated: ', isAuthenticated)
    }, [user, isAuthenticated])

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
