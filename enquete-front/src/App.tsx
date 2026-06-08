import {Routes, Route} from 'react-router-dom'
import Lista from './pages/Lista'
import Login from './pages/Login'
import Registro from './pages/Registro'
import RotaProtegida from './components/RotaProtegida'
import MinhasPerguntas from './pages/MinhasPerguntas'
import Layout from './components/Layout'


function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={
        <RotaProtegida>
          <Layout>
            <Lista />
          </Layout>
        </RotaProtegida>
        } />
        <Route path="/minhas-perguntas" element={
          <RotaProtegida>
            <Layout>
              <MinhasPerguntas />
            </Layout>
          </RotaProtegida>} />
    </Routes>
  )
}

export default App