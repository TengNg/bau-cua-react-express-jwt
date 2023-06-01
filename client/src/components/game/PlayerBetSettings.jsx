import React, { useEffect, useState } from 'react'
import BoxWrapper from './BoxWrapper'

export default function PlayerBetSettings({ isOpen, handleClose, currentPlayerId, getCurrentPlayer, handleSetPlayerBetInfo, betRange }) {
    const [items, setItems] = useState(getCurrentPlayer()?.betInfo || []);

    const { minBet, maxBet } = betRange;

    useEffect(() => {
        if (currentPlayerId) {
            setItems(getCurrentPlayer().betInfo);
        }
    }, [currentPlayerId]);

    useEffect(() => {
        handleSetPlayerBetInfo(currentPlayerId, items);
    }, [items]);

    const handleSelect = (e, id) => {
        if (e.target !== e.currentTarget) return;
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    };

    const handleBetMoneyChanged = (e, id) => {
        if (e.target !== e.currentTarget) return;
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, betMoney: +e.target.value } : item));
    };

    return (
        <>
            <BoxWrapper
                isOpen={isOpen}
                handleClose={handleClose}
                displayStringStyle={'grid place-items-center z-[100]'}
            >
                <p className='absolute top-[4rem] left-[4rem] text-3xl'>{getCurrentPlayer()?.name}</p>
                    <div className='section--style grid grid-cols-3 grid-rows-2 p-4 gap-4 items-center justify-items-center' >
                        {items.map((item, index) => {
                            return (<div
                                key={index}
                                className={`w-[150px] h-[150px] border-black border-[4px] font-bold flex--center flex-col gap-3 cursor-pointer ${item.selected ? 'bg-gray-400' : 'bg-gray-200'}`}
                                onClick={(e) => handleSelect(e, item.id)}
                            >
                                {item.name}
                                <input
                                    type="number"
                                    className='w-[80%] border-black border-[2px] text-center'
                                    onChange={(e) => handleBetMoneyChanged(e, item.id)}
                                    value={item.betMoney < minBet ? minBet : item.betMoney}
                                    step={minBet}
                                    min={minBet}
                                    max={maxBet}
                                />
                            </div>)
                        })}
                    </div>

            </BoxWrapper>
        </>
    )
}
