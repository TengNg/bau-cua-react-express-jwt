import React from 'react'
import Item from './Item'

export default function ResultInfo({ resultItems }) {
    return (
        <>
            <div
                className='w-[350px] h-[150px] border-black border-[4px] flex justify-center items-center gap-2 shadow-[5px_7px_0_0_black] bg-gray-300'
            >
                {resultItems.map((item, index) => {
                    return (
                        <Item key={index} { ...item } />
                    )
                })}
            </div>
        </>
    )
}
