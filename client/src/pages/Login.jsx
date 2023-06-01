import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import Title from '../components/Title';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const { setAuth } = useAuth();

    const usernameInputEl = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = async () => {
            const response = await axiosPrivate.get('/login');
            if (response.status === 200) {
                navigate('/gameplay')
            }
        }
        isLoggedIn().catch(_ => {
            setSuccess(false);
            usernameInputEl.current.focus();
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/login', JSON.stringify({ username: username.trim(), password }));
            const accessToken = response?.data?.accessToken;
            setAuth({ username, password, accessToken });
            setUsername('');
            setPassword('');
            setSuccess(true);
            navigate('/gameplay', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401 || err.response?.status === 400) {
                setErrMsg('Username or Password is incorrect');
            } else {
                setErrMsg('Failed to Login');
            }

            navigate('/login', { replace: true });
        }
    }

    return (
        <>
            <section className='relative w-[100%] h-[100vh] flex flex-col items-center p-5 gap-3 bg-gray-300'>
                <Title titleName={"Login"} />
                <div className='w-[100px] h-[3rem] absolute left-[1rem] top-[1rem]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate('/')}
                    >Back</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col section--style p-4'>
                    <label htmlFor="username" className='label--style'>Username:</label>
                    <input
                        className='border-[4px] border-black p-1 font-bold'
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={usernameInputEl}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password" className='label--style'>Password:</label>
                    <input
                        className='border-[4px] border-black p-1 font-bold select-none'
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="on"
                        required
                    />


                    <div className='h-[1rem] w-[100%] my-1 flex--center'>
                        {success === false && <p className='text-xs text-red-700 top-[1rem] right-[1rem] font-bold select-none'>{errMsg}</p>}
                    </div>

                    <div className='w-[70%] h-[3rem] m-[0_auto_1rem_auto]'>
                        <button className='button--style button--hover bg-white'>Log in</button>
                    </div>

                </form>

                <div className='items-start w-[300px] p-4 font-bold select-none'>
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
