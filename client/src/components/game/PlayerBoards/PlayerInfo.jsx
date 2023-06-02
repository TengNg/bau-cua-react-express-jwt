import React from 'react'

export default function PlayerInfo({ player, flag, selectedItems, resultItems }) {
    return (
        <div key={player.id} className='flex flex-row gap-3'>
            <span className='border-black border-[3px] text-center w-[60%] p-1'>{player.name}</span>
            <span className='border-black border-[3px] text-center w-[40%] p-1'>
                {
                    (selectedItems.length === 0)
                        ? "[No bet]"
                        : (flag === true && resultItems.length > 0)
                            ? player.previousWinningMoney
                            : "..."
                }
            </span>
        </div>
    )
}
