import axios from 'axios'
const api = axios.create({
    baseURL: 'http://174.174.0.54:3333'
})

export default api