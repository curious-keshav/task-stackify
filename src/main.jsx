import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SpriteProvider } from './context/SpriteContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpriteProvider>
      <App />
    </SpriteProvider>
  </StrictMode>
)
