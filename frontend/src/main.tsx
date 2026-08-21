import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App'

const container = document.getElementById('root')

if (!container) {
  throw new Error("No se encontró el elemento #root en index.html")
}

const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)