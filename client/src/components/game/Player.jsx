import React, { useRef, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Player({ player, handleSetPlayer, handleEditPlayer, handleRemovePlayer }) {
    const playerNameInputEl = useRef();

    const edit = () => {
        handleEditPlayer(player.id);
    }

    const set = (e) => {
        handleSetPlayer(player.id, e.target.value);
    }

    const remove = () => {
        handleRemovePlayer(player.id);
    }

    const selectedItems = useMemo(() => player.betInfo.filter(item => item.selected === true), [player.betInfo]);

    return (
        <>
            <div className='section--style gap-3 flex--center flex-col p-7'>
                <div className='flex--center flex-row gap-3'>
                    <div className='text-xl'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                        ref={playerNameInputEl}
                        className='border-[3px] border-black p-1 font-bold w-[15rem] h-[3rem] text-center'
                        type="text"
                        maxLength="15"
                        value={player.name}
                        onChange={set}
                        onFocus={() => { if (player.name.trim() === "[Playername]") handleSetPlayer(player.id, ""); }}
                        onBlur={() => { if (player.name.trim() === "") handleSetPlayer(player.id, "[Playername]") }}
                    />

                    <div className='w-[3rem] h-[3rem]'>
                        <button
                            className='button--style button--hover'
                            onClick={edit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>

                    <div className='w-[3rem] h-[3rem]'>
                        <button
                            className='button--style button--hover'
                            onClick={remove}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>

                {selectedItems.length > 0
                    && <div className='w-[20rem] border-black border-[3px] flex flex-row items-center overflow-x-scroll gap-2 p-2 bg-white'>
                        {selectedItems.map((item, index) => {
                            return <span key={index} className='select-none'>{item.name}({item.betMoney})</span>
                        })}
                    </div>
                }
            </div>
        </>
    )
}
