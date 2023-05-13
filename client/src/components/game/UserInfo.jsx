import React from 'react'
import { axiosPrivate } from '../../api/axios';
import useGameplayData from '../../hooks/useGameplayData';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserInfo() {
    const { userData, setUserData } = useGameplayData();
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const save = () => {
        let gameData = userData?.user?.gameData;
        axiosPrivate.post('/update', JSON.stringify({ gameData }));
    };

    const handleLogout = async (e) => {
        let gameData = userData?.user?.gameData;
        e.preventDefault();
        try {
            await axiosPrivate.post('/update', JSON.stringify({ gameData }));
            await axiosPrivate.get('/logout');
            setAuth({});
            setUserData({});
            navigate('/login', { replace: true });
        } catch (err) {
            setAuth({});
            setUserData({});
            navigate('/', { replace: true });
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center border-black border-[4px] p-3 w-fit absolute top-[2rem] right-[2rem] gap-3 shadow-[6px_8px_0_0_black] bg-gray-200'>
                <div className='select-none'>
                    <h3><span className='font-bold'>Username: </span>{userData?.user?.username}</h3>
                    <h3><span className='font-bold'>Total Money: </span>${userData?.user?.gameData.totalMoney}</h3>
                    <h3><span className='font-bold'>Bet Size: </span>{userData?.user?.gameData.betSize}</h3>
                </div>
                <div className='w-[80%] h-[0.25rem] bg-black'></div>
                <button onClick={save} className='border-black border-[4px] p-2 font-bold w-[80%] select-none'>Save</button>
                <button onClick={handleLogout} className='border-black border-[4px] p-2 font-bold w-[80%] select-none'>Logout</button>
            </div>
        </>
    )
}

