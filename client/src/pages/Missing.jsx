import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Missing() {
    const navigate = useNavigate();
    return (
        <>
            <h2>Looks like you are lost ...</h2>
            <button
                className='border-[3px] border-black font-bold'
                onClick={() => navigate('/', { replace: true })}
            >
                Go back to home page
            </button>
        </>
    )
}
