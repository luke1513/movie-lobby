import './App.css'
import { useState } from 'react'

import Template from './Template'

function App() {
  const [type, setType] = useState('Movies')

  return (<>
    <button onClick={() => setType('Movies')}>Movies</button>
    <button onClick={() => setType('Favorites')}>Favorites</button>
    <Template type={type} />
  </>)
}

export default App
