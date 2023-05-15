import React, { useEffect, forwardRef } from 'react'

const VALUES = [1, 2, 3, 4, 5];

const ItemBetLevelSelection = forwardRef((props, ref) => {
    const close = (e) => {
        if (e.currentTarget !== e.target) return;
        ref.current.classList.add('hidden')
    };

    return (
        <>
            <div
                ref={ref}
                className='w-[100%] h-[100%] bg-white bg-opacity-75 absolute grid place-items-center cursor-pointer hidden'
                onClick={close}
            >
                <div
                    className='w-[60%] h-[30%] section--style absolute flex--center gap-5'
                >
                    {VALUES.map((value, index) => {
                        return (
                            <div key={index} className='w-[80px] h-[80px]'>
                                <button
                                    key={value}
                                    className={`button--style text-xl`}
                                >
                                    x{value}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
})

export default ItemBetLevelSelection;
