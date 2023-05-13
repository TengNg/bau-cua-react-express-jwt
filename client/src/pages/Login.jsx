import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { auth, setAuth } = useAuth();

    const usernameInputEl = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (auth.accessToken) {
            navigate('/gameplay')
        } else {
            usernameInputEl.current.focus();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/login', JSON.stringify({ username: username.trim(), password }));
            const accessToken = response?.data?.accessToken;
            setAuth({ username, password, accessToken });
            setUsername('');
            setPassword('');
            navigate('/gameplay', { replace: true });
        } catch (err) {
            navigate(from, { replace: true });
        }
    }

    return (
        <>
            <section className='w-[100%] h-[100vh] flex flex-col items-center p-5 gap-2'>
                <h1 className='text-center m-5'>Sign In</h1>
                <form onSubmit={handleSubmit} className='login-form'>
                    <label htmlFor="username">Username:</label>
                    <input
                        className='border-[3px] border-black'
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={usernameInputEl}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className='border-[3px] border-black'
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="on"
                        required
                    />

                    <button className='mt-4 mx-auto border-black border-[3px] w-fit'>Sign In</button>
                </form>

                <div className='items-start w-[300px] p-4'>
                    <p>
                        Need an Account?<br />
                        <span>
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>

                    <p>
                        <span>
                            <Link to="/">Go back to Home</Link>
                        </span>
                    </p>
                </div>
            </section>
        </>
    )
}
