import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.scss'
import { useState } from 'react'

import Template from './components/Template'

const App = () => {
  const [type, setType] = useState('Movies')

  return (<>
    <div id='navigation-wrapper'>
      <div className={type === 'Movies' && 'nav-active'} onClick={() => setType('Movies')}>Movies</div>
      <div className={type === 'Favorites' && 'nav-active'} onClick={() => setType('Favorites')}>Favorites</div>
    </div>
    <Template type={type} />
  </>)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)