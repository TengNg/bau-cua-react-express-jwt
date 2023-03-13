import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';

const DEFAULT_BET_SIZE = 5_000;
const DEFAULT_TOTAL_MONEY = 100_000;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [gameData, setGameData] = useState({
        betSize: DEFAULT_BET_SIZE,
        totalMoney: DEFAULT_TOTAL_MONEY
    });

    useEffect(() => {
        if (auth.accessToken)
            navigate('/gameplay')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/login', JSON.stringify({ username, password, gameData }));
            const accessToken = response?.data?.accessToken;
            setAuth({ username, password, gameData, accessToken });
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

                    <div style={{ margin: 0 }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>Bet Size</p>
                        {[5000, 10000, 20000].map(num => {
                            return (
                                <label key={num} htmlFor={`bet-size-${num}`}>
                                    <input key={num}
                                        type="radio"
                                        value={num}
                                        name='gender'
                                        onChange={(e) => setGameData(prevData => {
                                            return { ...prevData, betSize: e.target.value }
                                        })}
                                    />
                                    ${num}
                                </label>
                            )
                        })}
                    </div>

                    <div className='user-initial-money-div'>
                        <label style={{ fontWeight: 'bold' }}>Your money: </label>
                        <input
                            className='border-[3px] border-black'
                            type="number"
                            value={gameData.totalMoney}
                            onChange={(e) => setGameData(prevData => {
                                return { ...prevData, totalMoney: e.target.value }
                            })}
                        />
                    </div>

                    <button>Sign In</button>
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
