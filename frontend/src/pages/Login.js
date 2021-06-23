import React, { useEffect, useState } from 'react'
import '../styles/Login.scss'

import api from '../services/api'


import logo from '../assets/logo.svg'
import cancel from '../assets/cancel.png'

export default function Login({ history }){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function Check(){
            const token = localStorage.getItem('token')
            try {
                await api.get('/user/check', {
                    headers: {
                        authorization: token
                    }
                })
                setLogged(true)
            } catch (error) {
                setLogged(false)
            }
        }
        Check()
    }, [])


    async function handleSubmit(e){
        e.preventDefault()
        try {
            const response = await api.get('/user/login', {
                headers: {
                    email: email,
                    password: password
                }
            })
            const datares = response.data
            const token = datares.token
            localStorage.setItem('token', token)
            history.push('/main')
        } catch (error) {
            setError(true)
        }
        
    }

    if (logged){
        history.push('/main')
    }

    if (error){
        console.log("Erou")
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="acs"></img>
                <input 
                placeholder="Email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input 
                placeholder="Senha"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
                {error && (
                <div className="error-container">
                    <div className="error-content">
                        <p>Usuário ou senha incorretos</p>
                        <div onClick={() => setError(false)}><img src={cancel} alt="Cancel"></img></div>
                    </div>
                </div>
            )}
            </form>
        </div>
    )
}