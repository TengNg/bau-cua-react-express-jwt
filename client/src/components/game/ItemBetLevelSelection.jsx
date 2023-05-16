import React, { forwardRef } from 'react'

const BET_LEVEL_VALUES = [1, 2, 3, 4, 5];

const ItemBetLevelSelection = forwardRef(({ items, currentItemId, handleBetLevelChanged }, ref) => {
    const close = (e) => {
        if (e.currentTarget !== e.target) return;
        ref.current.classList.add('hidden')
    };

    const setBetLevel = (value) => {
        handleBetLevelChanged(value);
    };

    const currentItemBetLevel = currentItemId === null ? 1 : items[currentItemId - 1].betLevel;

    return (
        <>
            <div
                ref={ref}
                className='w-[100%] h-[100%] bg-white bg-opacity-75 absolute grid place-items-center cursor-pointer z-50 hidden'
                onClick={close}
            >
                <div
                    className='w-[60%] h-[30%] section--style absolute flex--center gap-5'
                >
                    {BET_LEVEL_VALUES.map((value, index) => {
                        return (
                            <div key={index} className='w-[80px] h-[80px]'>
                                <button
                                    key={value}
                                    className={`button--style text-xl ${currentItemBetLevel === value ? 'button--clicked bg-gray-400 text-white' : ''}`}
                                    onClick={() => setBetLevel(value)}
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
