import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { FirebaseProvider } from './context/firebase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter >
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </HashRouter> 
  </StrictMode>,
)
