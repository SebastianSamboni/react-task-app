import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3900/api',
    withCredentials: true
})

export default instance