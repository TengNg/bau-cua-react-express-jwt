import React from 'react'
import Board from './Board'
import UserInfo from '../UserInfo'
import Menu from './Menu'
import { useNavigate } from 'react-router-dom'

export default function GameplayInfo({ isDataLoaded }) {
    const navigate = useNavigate();
    return (
        <div className='w-[100%] h-[100vh] flex flex-col justify-center items-center gap-4 relative'>
            <button onClick={() => {
                navigate('/home');
            }}>Back to Home</button>
            {isDataLoaded ? (
                <>
                    <UserInfo />
                    <Board />
                    <Menu />
                </>
            ) : <h1>Loading...</h1>}
        </div>
    )
}
