import React, { forwardRef } from 'react'

const BET_LEVEL_VALUES = [1, 2, 3, 4, 5];

const ItemBetLevelSelection = forwardRef(({ items, setItems, currentItemId, handleBetLevelChanged, betSize }, ref) => {
    const close = (e) => {
        if (e.currentTarget !== e.target) return;
        ref.current.classList.add('hidden')
    };

    const setBetLevel = (value) => {
        handleBetLevelChanged(value);
    };

    const confirmSelectCurrentItem = () => {
        setItems(currItems => [...currItems].map(item => item.id === currentItemId ? { ...item, selected: true } : item));
        ref.current.classList.add('hidden')
    };

    const cancelSelectCurrentItem = () => {
        setItems(currItems => [...currItems].map(item => item.id === currentItemId ? { ...item, betLevel: 1, selected: false } : item));
        ref.current.classList.add('hidden')
    };

    const currentItemBetLevel = currentItemId === null ? 1 : items[currentItemId - 1].betLevel;
    const currentItemName = currentItemId === null ? '' : items[currentItemId - 1].name;

    return (
        <>
            <div
                ref={ref}
                className='w-[100%] h-[100%] bg-white bg-opacity-75 absolute grid place-items-center cursor-pointer z-50 hidden'
                onClick={close}
            >
                <div className='xl:w-[50%] md:w-[70%] h-[30%] section--style absolute flex--center gap-5' >
                    <div className='absolute top-2 left-2 font-bold text-xs'>
                        Bet level: x{currentItemBetLevel} <br />
                        You bet: ${currentItemBetLevel * betSize} in {currentItemName}<br />
                    </div>

                    <div className='absolute bottom-2 font-bold text-xs flex--center gap-3'>
                        <div className='w-[4rem] h-[2rem]'>
                            <button
                                className='button--style shadow-none'
                                onClick={confirmSelectCurrentItem}
                            >Ok</button>
                        </div>

                        <div className='w-[4rem] h-[2rem]'>
                            <button
                                className='button--style shadow-none'
                                onClick={cancelSelectCurrentItem}
                            >Cancel</button>
                        </div>

                    </div>

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
