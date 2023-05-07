import React from 'react'
import Item from './Item'

export default function ResultInfo({ resultItems }) {
    return (
        <>
            <div
                className='w-[350px] h-[150px] border-black border-[3px] flex justify-center items-center gap-2'
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
