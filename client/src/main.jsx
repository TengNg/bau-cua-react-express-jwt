import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthContextProvider } from './context/AuthContextProvider'
import { GameplayContextProvider } from './context/GameplayContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <GameplayContextProvider>
                <App />
            </GameplayContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);

