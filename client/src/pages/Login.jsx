import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import Title from '../components/Title';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { auth, setAuth } = useAuth();

    const usernameInputEl = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        try {
            axiosPrivate.get('/login');
            if (auth?.accessToken) {
                navigate('/gameplay');
            }
        } catch (err) {
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
            <section className='relative w-[100%] h-[100vh] flex flex-col items-center p-5 gap-2 bg-gray-300'>
                <Title titleName={"Login"} />
                <div className='w-[100px] h-[3rem] absolute left-[1rem] top-[1rem]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate(from, { replace: true })}
                    >Back</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col section--style p-3'>
                    <label htmlFor="username" className='font-bold'>Username:</label>
                    <input
                        className='border-[4px] border-black p-1'
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={usernameInputEl}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password" className='font-bold'>Password:</label>
                    <input
                        className='border-[4px] border-black p-1'
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="on"
                        required
                    />

                    <div className='w-[70%] h-[3rem] m-[1rem_auto]'>
                        <button className='button--style button--hover'>Sign Up</button>
                    </div>
                </form>


                <div className='items-start w-[300px] p-4 font-bold'>
                    Already have an account?
                    <div className='w-[150px] h-[3rem]'>
                        <Link className='text-black hover:text-black' to="/register">
                            <button className='button--style button--hover'>Sign up</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
