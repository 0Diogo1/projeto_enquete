import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";


interface AuthContextType {
    token: string | null;
    usuario: string | null;
    login: (token: string, refreshToken: string, usuario: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
    carregando: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null)
    const [usuario, setUsuario] = useState<string | null>(null)
    const [carregando, setCarregando] = useState<boolean>(true)

    useEffect(() => {
    async function verificarToken() {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const usuarioSalvo = localStorage.getItem('usuario')

      if (accessToken) {
        // tem access token → usa direto
        setToken(accessToken)
        setUsuario(usuarioSalvo)
      } else if (refreshToken) {
        // não tem access mas tem refresh → tenta renovar
        try {
          const response = await axios.post('http://localhost:8000/auth/token/refresh/', {
            refresh: refreshToken,
          })
          const novoToken = response.data.access
          localStorage.setItem('access_token', novoToken)
          setToken(novoToken)
          setUsuario(usuarioSalvo)
        } catch {
          // refresh inválido → limpa tudo
          localStorage.clear()
        }
      }

      setCarregando(false)  // ← libera a renderização
    }

    verificarToken()
  }, [])

    function login(accessToken: string, refreshToken: string, nomeUsuario: string) {
        setToken(accessToken)
        setUsuario(nomeUsuario)
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('usuario', nomeUsuario)
    }

    function logout() {
        setToken(null)
        setUsuario(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('usuario')
    }

    return (
        <AuthContext.Provider value={{
            token,
            usuario,
            login,
            logout,
            isAuthenticated: () => !!token,
            carregando
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro do contexto AuthProvider')
    }
    return context
}