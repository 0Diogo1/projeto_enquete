import {Routes, Route} from 'react-router-dom'
import Lista from './pages/Lista'


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Lista />} />
    </Routes>
  )
}

export default App