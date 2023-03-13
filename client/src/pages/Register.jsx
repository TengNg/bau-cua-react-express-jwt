import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^.{8,24}$/;

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const passwordInputEl = useRef(null);
    const usernameInputEl = useRef(null);
    const confirmedPasswordInputEl = useRef(null);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        usernameInputEl.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const matched = PWD_REGEX.test(password);

        if (matched === false) {
            setErrMsg('Password invalid');
            passwordInputEl.current.focus();
            return;
        }

        if (confirmedPassword !== password) {
            setErrMsg('Password do not match');
            setSuccess(false);
            confirmedPasswordInputEl.current.focus();
            return;
        }

        try {
            const response = await axiosPrivate.post('/register', JSON.stringify({ username, password }));
            console.log(response.data);
            setSuccess(true);
            setUsername('');
            setPassword('');
            navigate('/login', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

    return (
        <>
            {success === false && <p style={{ color: 'maroon' }}>{errMsg}</p>}
            <section>
                <h1>Register</h1>
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
                        ref={passwordInputEl}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="on"
                        required
                    />

                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        className='border-[3px] border-black'
                        type="confirmed-password"
                        id="confirmed-password"
                        ref={confirmedPasswordInputEl}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        value={confirmedPassword}
                        autoComplete="on"
                        required
                    />

                    <button className='border-[3px] border-black font-bold mt-8'>Sign Up</button>

                </form>

                <p>
                    Already have an Account?<br />
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                </p>
            </section>
        </>
    )
}
