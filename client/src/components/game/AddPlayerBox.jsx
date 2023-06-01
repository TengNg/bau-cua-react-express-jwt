import Player from './Player';
import BoxWrapper from './BoxWrapper';
import PlayerBetSettings from './PlayerBetSettings';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddPlayerBox({ boxOpen, setBoxOpen, players, handleAddPlayer, handleSetPlayer, handleRemovePlayer, handleSetPlayerBetInfo, betRange }) {
    const [selectOpen, setSelectOpen] = useState(false);
    const [currentPlayerId, setCurrentPlayerId] = useState(null);

    const handleCloseBox = (e) => {
        if (e.currentTarget !== e.target) return;
        setBoxOpen(false);
        setSelectOpen(false);
    }

    const handleCloseSelect = (e) => {
        if (e.currentTarget !== e.target) return;
        setSelectOpen(false);
    }

    const handleEditPlayer = (id) => {
        setSelectOpen(true);
        const selectedPlayer = players.find(p => p.id === id);
        setCurrentPlayerId(selectedPlayer.id);
    }

    const getCurrentPlayerWithId = () => currentPlayerId === null ? undefined : players.filter(player => player.id === currentPlayerId)[0];

    return (
        <>
            <PlayerBetSettings
                isOpen={selectOpen}
                handleClose={handleCloseSelect}
                currentPlayerId={currentPlayerId}
                getCurrentPlayer={getCurrentPlayerWithId}
                handleSetPlayerBetInfo={handleSetPlayerBetInfo}
                betRange={betRange}
            />

            <BoxWrapper
                isOpen={boxOpen}
                handleClose={handleCloseBox}
                displayStringStyle={'grid place-items-center'}
            >
                <div className='w-[80%] h-[80%] flex--center flex-col section--style bg-gray-300 gap-3 cursor-auto'>
                    <div className='w-[90%] h-[30rem] border-[3px] border-black flex flex-col items-center justify-[center_safe] gap-5 p-4 overflow-y-scroll'>
                        {players.map((player, index) => {
                            return (
                                <Player
                                    key={index}
                                    player={player}
                                    setSelectOpen={setSelectOpen}
                                    handleEditPlayer={handleEditPlayer}
                                    handleSetPlayer={handleSetPlayer}
                                    handleRemovePlayer={handleRemovePlayer}
                                />
                            )
                        })}
                    </div>
                    <div className='w-[3rem] h-[3rem]'>
                        <button
                            onClick={handleAddPlayer}
                            className='button--style button--hover'
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </BoxWrapper>
        </>
    )
}
