import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { registro as registroService } from '../services/authService'

function Registro() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegistro() {
    setErro('')
    setLoading(true)

    const usernameSemEspaços = username.trim().replace(/\s+/g, '_')
    try {
      await registroService(usernameSemEspaços, email, password)
      navigate('/login')
    } catch {
      setErro('Erro ao criar conta. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card title="Criar Conta" style={{ width: '400px' }}>
        <div className="flex flex-column gap-3">
          <InputText
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputText
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
          />
          {erro && <small className="p-error">{erro}</small>}
          <Button
            label="Criar Conta"
            loading={loading}
            onClick={handleRegistro}
          />
          <Link to="/login">Já tem conta? Faça login</Link>
        </div>
      </Card>
    </div>
  )
}

export default Registro