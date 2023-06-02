import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import PlayerInfo from './PlayerInfo';

export default function PlayerBoards({ players, flag, resultItems }) {
    const [show, setShow] = useState(true);

    return (
        <>
            <div className='absolute w-[3rem] h-[3rem] top-[2rem] right-[2rem]'>
                <button
                    className={`button--style ${show ? 'button--clicked' : ''}`}
                    onClick={() => setShow(show => !show)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>

            <div
                className={`
                section--style w-[300px] h-[250px] flex-col border-[3px] border-black p-3 absolute top-[2rem] right-[6rem] gap-3 overflow-y-scroll select-none
                ${show ? 'flex' : 'hidden'}
                `}
            >
                <p className='font-bold'>[MoneyWin/Round]</p>
                {
                    players.length > 0
                        ? (
                            players.map((player, _) => {
                                const selectedItems = player.betInfo.filter(item => item.selected === true);
                                return <PlayerInfo
                                    player={player}
                                    flag={flag}
                                    resultItems={resultItems}
                                    selectedItems={selectedItems}
                                />
                            })
                        )
                        : "[No Players] :("
                }
            </div>
        </>
    )
}
