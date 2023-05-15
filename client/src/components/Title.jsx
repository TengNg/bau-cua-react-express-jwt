import React from 'react'

export default function Title({ titleName }) {
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-center font-bold">{titleName}</h1>
                <div className="w-[10%] h-[0.5rem] bg-black"></div>
            </div>
        </>
    )
}
