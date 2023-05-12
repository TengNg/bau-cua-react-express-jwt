import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <>
            <nav className='flex justify-center items-center h-[40%]'>
                <Link to='/gameplay'>
                    <button
                        className='
                        w-[12rem]
                        h-[5rem]
                        font-bold
                        text-black
                        text-2xl
                        border-[5px]
                        border-black
                        rounded-[0px]
                        shadow-[5px_8px_0_0_black]
                        transition-all
                        hover:shadow-none
                        hover:ml-[5px]
                        '
                    >
                        Play
                    </button>
                </Link>
            </nav>
        </>
    )
}
