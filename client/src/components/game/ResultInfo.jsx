import React from 'react'
import Item from './Item'

// {flag === false && <p className='text-gray-700 font-bold'>Waiting: {counter}s. Please check your result</p>}
export default function ResultInfo({ resultItems, counter, flag }) {
    return (
        <>

            <div
                className='w-[350px] h-[150px] section--style gap-2 flex--center'
            >
                {
                    flag === false
                    ? <p className='text-gray-700 font-bold'>Waiting: {counter}s.</p>
                    : resultItems.map((item, index) =>  <Item key={index} { ...item } />)
                }
            </div>
        </>
    )
}
