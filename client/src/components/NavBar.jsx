import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <>
            <nav className='flex justify-center items-center h-[40%] gap-10'>
                <div className='w-[10rem] h-[5rem]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate('/gameplay')}
                    >
                        Play
                    </button>
                </div>

                <div className='w-[10rem] h-[5rem]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate('/local')}
                    >
                        Local sandbox
                    </button>
                </div>
            </nav>
        </>
    )
}
