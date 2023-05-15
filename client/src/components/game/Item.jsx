import React, { useRef } from 'react'

export default function Item({
    id,
    name,
    betLevel,
    selected,
    canSelect,
    handleSelectItem,
    handleBetLevelChanged,
    handleOpenItemBetLevelSelection,
}) {
    const select = (e) => {
        if (e.currentTarget !== e.target) return;
        handleSelectItem(id);
    }

    const openBetLevelSelection = (e) => {
        handleOpenItemBetLevelSelection(e);
    }

    return (
        <>
            <div
                className={`w-[100px] h-[100px] border-black border-[3px] grid place-items-center select-none cursor-pointer font-bold ${selected ? 'bg-[#bdbdbd]' : 'bg-[whitesmoke]'}`}
                onClick={(e) => select(e)}
                onContextMenu={(e) => openBetLevelSelection(e)}
            >
                {name}
                {canSelect && (
                    <input
                        type='number' value={betLevel} min="1" max="5"
                        className='w-[3rem] border-black border-[2px] text-center select-none'
                        onChange={(e) => handleBetLevelChanged(id, +e.target.value)}
                        onKeyDown={() => false}
                    />
                )}
            </div>
        </>
    )
}
