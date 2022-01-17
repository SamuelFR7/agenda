import axios from 'axios'
import { parseCookies } from 'nookies'

const { token } = parseCookies()

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_AGENDA
})

if (token) {
  api.defaults.headers.common.authorization = `Bearer ${token}`
}

export default api
