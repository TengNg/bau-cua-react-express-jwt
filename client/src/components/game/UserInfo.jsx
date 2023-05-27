import React from 'react'
import { axiosPrivate } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserInfo({ userData, setUserData, isLocalGameplay }) {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const save = async () => {
        let gameData = userData?.user?.gameData;
        await axiosPrivate.post('/update', JSON.stringify({ gameData }));
        alert('Game saved');
    };

    const handleLogout = async () => {
        let gameData = userData?.user?.gameData;
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
            <div className='flex--center flex-col section--style p-3 w-fit absolute top-[2rem] right-[2rem] gap-3'>
                <div className='select-none'>
                    <h3><span className='font-bold'>Username: </span>{userData?.user?.username}</h3>
                    <h3><span className='font-bold'>Total Money: </span>${userData?.user?.gameData.totalMoney}</h3>
                    <h3><span className='font-bold'>Bet Size: </span>{userData?.user?.gameData.betSize}</h3>
                </div>
                {isLocalGameplay === false && (
                    <>
                        <div className='w-[80%] h-[0.25rem] bg-black'></div>
                        <div className='w-[85%] h-[3rem]'> <button onClick={save} className='button--style button--hover'>Save</button> </div>
                        <div className='w-[85%] h-[3rem]'> <button onClick={handleLogout} className='button--style button--hover'>Logout</button> </div>
                    </>
                )}
            </div>
        </>
    )
}

