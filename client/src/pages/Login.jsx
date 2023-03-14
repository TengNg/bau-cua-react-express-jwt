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
        if (auth.accessToken)
            navigate('/gameplay')
        usernameInputEl.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/login', JSON.stringify({ username, password }));
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
            <section>
                <h1>Sign In</h1>
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
            </section>
        </>
    )
}
