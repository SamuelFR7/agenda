import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/AuthTokenError'

let isRefreshing = false
let failedRequestQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)
  interface IAxiosErrorResponse {
    message: string
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL_AGENDA,
    headers: {
      Authorization: `Bearer ${cookies['agenda.token']}`,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<IAxiosErrorResponse>) => {
      if (error.response.status === 401) {
        if (error.response.data.message === 'Invalid token') {
          cookies = parseCookies(ctx)

          const { 'agenda.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/users/refresh-token', {
                token: refreshToken,
              })
              .then((response) => {
                const { token, refresh_token } = response.data

                setCookie(undefined, 'agenda.token', token, {
                  maxAge: 60 * 30 * 24 * 30, // 30 days
                  path: '/',
                })
                setCookie(undefined, 'agenda.refreshToken', refresh_token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                })

                api.defaults.headers.common.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err))
                failedRequestQueue = []

                if (typeof window !== 'undefined') {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              },
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
