import Player from './Player';
import BoxWrapper from './BoxWrapper';
import PlayerBetSettings from './PlayerBetSettings';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function AddPlayerBox({
    boxOpen,
    setBoxOpen,
    players,
    currentPlayerId,
    betRange,
    handleAddPlayer,
    handleSetPlayer,
    handleEditPlayer,
    handleRemovePlayer,
    handleRemoveAllPlayers,
    handleSetPlayerBetInfo,
}) {
    const [selectOpen, setSelectOpen] = useState(false);

    const handleCloseBox = (e) => {
        if (e.currentTarget !== e.target) return;
        setBoxOpen(false);
        setSelectOpen(false);
    }

    const handleCloseSelect = (e) => {
        if (e.currentTarget !== e.target) return;
        setSelectOpen(false);
    }

    const editPlayerBetInfo = (id) => {
        setSelectOpen(true);
        handleEditPlayer(id);
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
                <div className='w-[80%] h-[90%] flex--center flex-col section--style bg-gray-300 gap-3 cursor-auto relative'>
                    <div className='w-[6rem] h-[4rem] absolute top-[1rem] right-[1rem]'>
                        <button
                            className="button--style button--hover absolute "
                            onClick={handleCloseBox}
                        >Close</button>
                    </div>
                    <div className='w-[90%] h-[35rem] border-[3px] border-black flex flex-col items-center justify-[center_safe] gap-5 p-4 overflow-y-scroll'>
                        {players.map((player, index) => {
                            return (
                                <Player
                                    key={index}
                                    player={player}
                                    setSelectOpen={setSelectOpen}
                                    handleEditPlayer={editPlayerBetInfo}
                                    handleSetPlayer={handleSetPlayer}
                                    handleRemovePlayer={handleRemovePlayer}
                                />
                            )
                        })}
                    </div>
                    <div className='w-[4rem] h-[4rem]'>
                        <button
                            onClick={handleAddPlayer}
                            className='button--style button--hover'
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>


                    <div className='w-[8rem] h-[4rem] absolute bottom-[1rem]'>
                        <button
                            className="button--style button--hover absolute "
                            onClick={handleRemoveAllPlayers}
                        >Remove all</button>
                    </div>

                </div>
            </BoxWrapper>
        </>
    )
}
