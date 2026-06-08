import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',

})


// Intereceptor de requisição -> adiciona o token atomaticamente pra toda requisição à api
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

//Resumo do Fluxo

// Requisição falha com 401
//         ↓
// Tem refresh token?
//    Não → limpa localStorage → redireciona para /login
//    Sim → chama /auth/token/refresh/
//               ↓
//          Refresh válido?
//             Sim → salva novo token → repete requisição original
//             Não → limpa localStorage → redireciona para /login

//Interceptor de resposta -> renova o token quando expirar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const response = await axios.post('http://localhost:8000/auth/token/refresh/', {
          refresh: refreshToken,
        })

        const novoToken = response.data.access
        localStorage.setItem('access_token', novoToken)
        originalRequest.headers.Authorization = `Bearer ${novoToken}`

        return api(originalRequest)
      } catch {
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
export default api

