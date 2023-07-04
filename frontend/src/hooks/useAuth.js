import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuthenticated(true)
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        }
    }, [])

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'
        try {
            const data = await api.post('/users/register', user)
                .then(res => {
                    return res.data
                })

            console.log(data)
            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        navigate('/')
    }

    function logout() {
        const msgText = 'Lougout realizado com sucesso!'
        const msgType = 'sucess'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/login', user)
                .then(response => response.data)

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
            setFlashMessage(msgText, msgType)
        }

    }
    return { authenticated, register, logout, login }
}