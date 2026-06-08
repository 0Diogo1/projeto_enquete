import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { login as loginService } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleLogin() {
    setErro('')
    setLoading(true)

    const usernameSemEspaços = username.trim().replace(/\s+/g, '_')
    try {
      const data = await loginService(usernameSemEspaços, password)
      login(data.access, data.refresh, usernameSemEspaços)
      navigate('/')
    } catch {
      setErro('Usuário ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card title="Login" style={{ width: '400px' }}>
        <div className="flex flex-column gap-3">
          <InputText
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Password
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            toggleMask
          />
          {erro && <small className="p-error">{erro}</small>}
          <Button
            label="Entrar"
            loading={loading}
            onClick={handleLogin}
          />
          <Link to="/registro">Não tem conta? Registre-se</Link>
        </div>
      </Card>
    </div>
  )
}

export default Login