import React, { useState } from 'react'
import AddPlayerBox from './AddPlayerBox';
import { useNavigate, useLocation } from 'react-router-dom';
import ResultInfo from './ResultInfo';

const MIN_BET = 5_000;
const MAX_BET = 100_000;
const WAITING_TIME = 3;

export default function PlayWithFriend() {
    const [boxOpen, setBoxOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [betRange, setBetRange] = useState({ minBet: MIN_BET, maxBet: MAX_BET });

    // for generating result
    const [resultItems, setResultItems] = useState([]);
    const [flag, setFlag] = useState(true);
    const [counter, setCounter] = useState(WAITING_TIME);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleAddPlayer = () => {
        const newPlayer = {
            id: Date.now(),
            name: "[Playername]",
            betInfo: [
                { id: 1, name: "Huou", selected: false, betMoney: betRange.minBet },
                { id: 2, name: "Bau", selected: false, betMoney: betRange.minBet },
                { id: 3, name: "Ga", selected: false, betMoney: betRange.minBet },
                { id: 4, name: "Ca", selected: false, betMoney: betRange.minBet },
                { id: 5, name: "Cua", selected: false, betMoney: betRange.minBet },
                { id: 6, name: "Tom", selected: false, betMoney: betRange.minBet }
            ]
        }
        setPlayers((prev) => [...prev, newPlayer]);
    }

    const handleSetPlayer = (id, value) => {
        setPlayers((prevPlayers) => [...prevPlayers].map(player => player.id === id ? { ...player, name: value } : player));
    }

    const handleRemovePlayer = (id) => {
        setPlayers((prevPlayers) => [...prevPlayers].filter(player => player.id !== id));
    }

    const handleSetPlayerBetInfo = (id, newBetInfo) => {
        setPlayers((prevPlayers) => [...prevPlayers].map(player => player.id === id ? { ...player, betInfo: newBetInfo } : player));
    }

    return (
        <>
            <div className='absolute flex justify-center items-center top-[2rem] left-[2rem] gap-7'>
                <div className='w-[100px] h-[50px]'>
                    <button
                        className='button--style button--hover'
                        onClick={() => navigate(from, { replace: true })}
                    >Back</button>
                </div>
            </div>

            <ResultInfo
                resultItems={resultItems}
                counter={counter}
                flag={flag}
            />

            <div className='w-[8rem] h-[3rem]'>
                <button className='button--style button--hover'>Roll</button>
            </div>

            <AddPlayerBox
                boxOpen={boxOpen}
                setBoxOpen={setBoxOpen}
                players={players}
                handleAddPlayer={handleAddPlayer}
                handleRemovePlayer={handleRemovePlayer}
                handleSetPlayer={handleSetPlayer}
                handleSetPlayerBetInfo={handleSetPlayerBetInfo}
                betRange={betRange}
            />

            <div className='w-[8rem] h-[3rem]'>
                <button
                    className='button--style button--hover'
                    onClick={() => setBoxOpen(true)}
                >Add Player</button>
            </div>
        </>
    )
}
