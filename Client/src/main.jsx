import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '../Utils/AuthContext.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './Theme/index.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
