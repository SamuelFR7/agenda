import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ADDRESS,
  headers: {
    Authorization: `Bearer ${cookies['agendav2.token']}`,
  },
})

export { api }
