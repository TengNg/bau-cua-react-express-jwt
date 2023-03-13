import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <nav className='flex justify-center items-center w-[100%] h-[30%]'>
                <Link to='/gameplay'>
                    <button
                        className='font-bold text-black border-[4px] border-black rounded-[0px] hover:border-black'
                    >
                        Play
                    </button>
                </Link>
            </nav>
        </>
    )
}
