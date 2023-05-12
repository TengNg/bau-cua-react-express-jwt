import React from 'react'

export default function Item({ id, name, betLevel, selected, handleSelect, handleBetLevelChanged, canSelect }) {
    const select = (e) => {
        if (e.currentTarget !== e.target) return;
        handleSelect(id);
    }

    return (
        <>
            <div
                onClick={(e) => select(e)}
                className='w-[100px] h-[100px] border-black border-[3px] grid place-items-center select-none cursor-pointer font-bold'
                style={{ background: selected ? '#bdbdbd' : 'whitesmoke' }}
            >
                {name}
                {canSelect && (
                    <input
                        type='number' value={betLevel} min="1" max="5"
                        className='w-[3rem] border-black border-[2px] text-center'
                        onChange={(e) => handleBetLevelChanged(id, +e.target.value)}
                    />
                )}
            </div>
        </>
    )
}
