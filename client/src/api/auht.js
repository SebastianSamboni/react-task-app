import axios from 'axios'

const API = ('http://localhost:3900/api')

// Función para registrar usuario donde los parámetros en .post (Petición http) son
// 1. Ruta de la api
// 2. user -> Usuario a registrar
export const registerRequest = user => axios.post(`${API}/register`, user)