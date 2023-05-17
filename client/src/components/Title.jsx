import React from 'react'

export default function Title({ titleName }) {
    return (
        <>
            <div className='flex flex-col justify-center items-center select-none m-[0_0_2rem_0]'>
                <h1
                    className="relative text-center font-bold underline--style underline--hover transition all hover:text-gray-500"
                >{titleName}</h1>
            </div>
        </>
    )
}
