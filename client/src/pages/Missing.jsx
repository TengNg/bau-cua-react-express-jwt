import React from 'react'
import Wrapper from '../components/Wrapper';
import { useNavigate } from 'react-router-dom'

export default function Missing() {
    const navigate = useNavigate();
    return (
        <>
            <Wrapper>
                <h2 className='font-bold'>Looks like you are lost ...</h2>
                <div className='w-[17rem] h-[5rem]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate('/', { replace: true })}
                    >
                        Go back to home page
                    </button>
                </div>
            </Wrapper>
        </>
    )
}
