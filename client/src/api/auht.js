import axios from './axios'

// Función para registrar usuario donde los parámetros en .post (Petición http) son
// 1. Ruta de la api
// 2. user -> Usuario a registrar
export const registerRequest = user => axios.post(`/register`, user)
export const loginRequest = user => axios.post(`/login`, user)
export const verifyTokenRequest = () => axios.get('/verify')