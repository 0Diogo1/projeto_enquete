import {Routes, Route} from 'react-router-dom'
import Lista from './pages/Lista'
import Detalhes from './pages/Detalhes'


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Lista />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
    </Routes>
  )
}

export default App