import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
}

function RotaProtegida({ children }: Props) {
  const { isAuthenticated, carregando } = useAuth()

  if (carregando) return <p>Carregando...</p>

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default RotaProtegida