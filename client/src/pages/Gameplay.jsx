import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const BET_SIZE_OPTIONS = [5_000, 10_000, 20_000];
const ADD_MORE_MONEY_OPTIONS = [5_000, 10_000, 20_000];

export default function Gameplay() {
    const [userData, setUserData] = useState({});
    const axiosWithInterceptors = useAxiosPrivate();

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGameData = async () => {
            try {
                const response = await axiosWithInterceptors.get('/gameplay', { signal: controller.signal });
                isMounted && setUserData(response.data);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getGameData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const gameData = userData?.user?.gameData;
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.post('/update', JSON.stringify({ gameData }));
            await axiosPrivate.get('/logout');
            setAuth({});
            navigate('/login', { replace: true });
        } catch (err) {
            navigate('/', { replace: true });
        }
    }

    const handleAddMoreMoney = (val) => {
        setUserData(prevData => {
            const newData = { ...prevData };

            if (newData.user.gameData.totalMoney + val <= 100_000) {
                newData.user.gameData.totalMoney += val;
            }

            return newData;
        });
    }

    return (
        <div className='game-data'>
            <section className='my-2 border-black border-[3px] p-4 w-fit'>
                <h3 className='font-bold underline'>Change bet size: </h3>
                {BET_SIZE_OPTIONS.map(num => {
                    return (
                        <label key={num} htmlFor={`bet-size-${num}`}>
                            <input
                                key={num}
                                type="radio"
                                value={num}
                                name='gender'
                                onChange={(e) => setUserData(prevData => {
                                    const newData = { ...prevData }
                                    newData.user.gameData.betSize = e.target.value;
                                    return newData;
                                })}
                            />
                            ${num}
                        </label>
                    )
                })}
            </section>
            <section className='border-black border-[3px] p-4 w-fit'>
                <h3 className='font-bold underline'>Add more money: </h3>
                {ADD_MORE_MONEY_OPTIONS.map((item, index) => {
                    return (
                        <div key={index} className='mt-4 p-2 border-[3px] border-black flex flex-row items-center w-[12rem]'>
                            <p key={index + 10} className='flex-1'>${item}</p>
                            <button
                                key={index + 20}
                                onClick={() => {
                                    handleAddMoreMoney(item);
                                }}
                                className='text-[0.75rem] font-bold border-[3px] border-black w-fit'>
                                +
                            </button>
                        </div>
                    )
                })}
            </section>

            <br />

            <h3>Username: {userData?.user?.username}</h3>
            <h3>Total Money: {userData?.user?.gameData.totalMoney}</h3>
            <h3>Bet Size: {userData?.user?.gameData.betSize}</h3>
            <button onClick={handleLogout} style={{ border: "2px solid black" }}>Logout</button>
        </div>
    )
}

