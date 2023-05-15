import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Gameplay from './pages/Gameplay'
import Register from './pages/Register'
import Missing from './pages/Missing'

function App() {
    return (
        <>
            <div className='w-[100%] h-[100vh]'>
                <Routes>
                    {["/", "/home", "/index"].map((path, index) => {
                        return (
                            <Route key={index} path={path} element={<Home />} />
                        )
                    })}
                    <Route path="/gameplay" element={<Gameplay />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/*" element={<Missing />} />
                </Routes>
            </div>

        </>
    )
}

export default App
