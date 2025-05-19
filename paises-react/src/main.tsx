import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CountryProvider } from './context/CountryContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <CountryProvider>
      <App/>
    </CountryProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
