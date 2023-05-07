import React from 'react'
import { axiosPrivate } from '../api/axios';
import useGameplayData from '../hooks/useGameplayData';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const { userData } = useGameplayData();
    const navigate = useNavigate();

    const save = () => {
        let gameData = userData.user.gameData;
        axiosPrivate.post('/update', JSON.stringify({ gameData }));
    };

    const handleLogout = async (e) => {
        let gameData = userData.user.gameData;
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

    return (
        <>
            <div className='flex flex-col justify-center border-black border-[3px] p-3 w-fit absolute top-[1rem] left-[1rem] gap-1'>
                <h3>Username: {userData.user.username}</h3>
                <h3>Total Money: {userData.user.gameData.totalMoney}</h3>
                <h3>Bet Size: {userData.user.gameData.betSize}</h3>
                <button onClick={save} className='border-black border-[3px]'>Save</button>
                <button onClick={handleLogout} className='border-black border-[3px]'>Logout</button>
            </div>
        </>
    )
}

