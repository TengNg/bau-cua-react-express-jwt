import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import Title from '../components/Title';
import useAuth from '../hooks/useAuth';

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^.{8,24}$/;

export default function Register() {
    const { auth } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const passwordInputEl = useRef(null);
    const usernameInputEl = useRef(null);
    const confirmedPasswordInputEl = useRef(null);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        try {
            axiosPrivate.get('/register');
            if (auth?.accessToken) {
                navigate('/gameplay');
            }
        } catch (err) {
            usernameInputEl.current.focus();
        }
    }, [])

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
            await axiosPrivate.post('/register', JSON.stringify({ username, password }));
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
            {success === false && <p className='text-red-300'>{errMsg}</p>}
            <section className='relative w-[100%] h-[100vh] flex flex-col items-center p-5 gap-2 bg-gray-300'>
                <div className='w-[100px] h-[3rem] absolute left-[1rem] top-[1rem]'>
                    <button
                        className='button--style'
                        onClick={() => navigate(from, { replace: true })}
                    >Back</button>
                </div>
                <Title titleName={"Register"} />
                <form onSubmit={handleSubmit} className='flex flex-col section--style p-3'>
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

                    <div className='w-[70%] h-[3rem] m-[1rem_auto]'>
                        <button className='button--style'>Sign Up</button>
                    </div>

                </form>


                <div className='items-start w-[300px] p-4 font-bold'>
                    Already have an Account?
                    <div className='w-[150px] h-[3rem]'>
                        <Link className='text-black hover:text-black' to="/login">
                            <button className='button--style'>Login</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
