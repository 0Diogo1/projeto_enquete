import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, usuario } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const titulo = location.pathname === '/minhas-perguntas' ? 'Minhas Perguntas' : 'Enquetes'

  return (
    <div className="flex justify-content-between align-items-center p-3"
      style={{ borderBottom: '1px solid #dee2e6' }}>
      <div className="flex align-items-center gap-3">
        <span className="text-xl font-bold">{titulo}</span>
        <Button
          label="Início"
          text
          severity={location.pathname === '/' ? 'help' : 'secondary'}
          onClick={() => navigate('/')}
        />
        <Button
          label="Minhas Perguntas"
          text
          severity={location.pathname === '/minhas-perguntas' ? 'help' : 'secondary'}
          onClick={() => navigate('/minhas-perguntas')}
        />
      </div>
      <div className="flex align-items-center gap-3">
        <span>Olá, <strong>{usuario}</strong></span>
        <Button
          label="Sair"
          icon="pi pi-sign-out"
          outlined
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default Navbar