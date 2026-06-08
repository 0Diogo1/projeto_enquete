import api from './api'

export const login = async (username: string, password: string) => {
    const response = await api.post('/auth/token/', {username, password})
    return response.data
}

export const registro = async (username:string, email:string, password:string) => {
    const response = await api.post('/auth/registro/', {username, email, password})
    return response.data
}