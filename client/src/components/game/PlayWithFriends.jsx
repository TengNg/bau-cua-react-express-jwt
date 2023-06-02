import React, { useEffect, useState, useRef } from 'react'
import AddPlayerBox from './AddPlayerBox';
import { useNavigate, useLocation } from 'react-router-dom';
import ResultInfo from './ResultInfo';
import PlayerBoards from './PlayerBoards/PlayerBoards';

const DEFAULT_MIN_BET = 5_000;
const DEFAULT_MAX_BET = 100_000;
const DEFAULT_INPUT_STEP = 1_000;

const WAITING_TIME = 3;
const ITEMS = [
    { id: 1, name: "Huou" },
    { id: 2, name: "Bau" },
    { id: 3, name: "Ga" },
    { id: 4, name: "Ca" },
    { id: 5, name: "Cua" },
    { id: 6, name: "Tom" }
]

const generateResultItems = () => {
    const randomItems = []
    const data = [...ITEMS];
    for (let i = 0; i < 3; i++) {
        randomItems.push(data[Math.floor(Math.random() * 6)]);
    }
    return randomItems;
};

const calculateWinningMoney = (resultItems, selectedItems) => {
    const resultTally = resultItems.reduce((obj, item) => {
        obj[item.name] = (obj[item.name] == null) ? 1 : obj[item.name] + 1
        return obj
    }, {});

    const winningMoney = selectedItems.reduce((total, currItem) => {
        total = !resultTally[currItem.name] ? total - currItem.betMoney : total + currItem.betMoney * resultTally[currItem.name];
        return total
    }, 0)

    return winningMoney
}

export default function PlayWithFriends() {
    const [boxOpen, setBoxOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [currentPlayerId, setCurrentPlayerId] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    const [betRange, setBetRange] = useState({ minBet: DEFAULT_MIN_BET, maxBet: DEFAULT_MAX_BET });
    const [minBet, setMinBet] = useState(DEFAULT_MIN_BET);
    const [maxBet, setMaxBet] = useState(DEFAULT_MAX_BET);

    const [resultItems, setResultItems] = useState([]);
    const [flag, setFlag] = useState(true);
    const [counter, setCounter] = useState(WAITING_TIME);
    const [intervalId, setIntervalId] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const timerId = useRef(null);

    useEffect(() => {
        setBetRange((p) => {
            p.minBet = minBet;
            p.maxBet = maxBet;
            return p;
        });
    }, [minBet, maxBet]);

    useEffect(() => {
        if (flag === false) {
            timerId.current = setTimeout(() => {
                stopTimer();
            }, WAITING_TIME * 1000);
        }
        () => clearTimeout(timerId.current);
    }, [flag]);

    useEffect(() => {
        handleSetPlayersWinningMoney();
    }, [resultItems]);

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
            ],
            previousWinningMoney: null,
        }
        setPlayers((prev) => [...prev, newPlayer]);
    }

    const handleSetPlayer = (id, value) => {
        setPlayers((prevPlayers) => [...prevPlayers].map(player => player.id === id ? { ...player, name: value } : player));
    }

    const handleEditPlayer = (id) => {
        const selectedPlayer = players.find(p => p.id === id);
        setCurrentPlayerId(selectedPlayer.id);
    }

    const handleRemovePlayer = (id) => {
        setPlayers((prevPlayers) => [...prevPlayers].filter(player => player.id !== id));
    }

    const handleSetPlayerBetInfo = (id, newBetInfo) => {
        setPlayers((prevPlayers) => [...prevPlayers].map(player => player.id === id ? { ...player, betInfo: newBetInfo } : player));
    }

    const handleSetPlayersWinningMoney = () => {
        setPlayers((prevPlayers) => [...prevPlayers].map(player => {
            const selectedItems = player.betInfo.filter(item => item.selected === true);
            player.previousWinningMoney = calculateWinningMoney(resultItems, selectedItems);
            return player;
        }));
    }

    const handleRemoveAllPlayers = () => {
        if (players.length > 0) setPlayers([]);
    }

    const startTimer = () => {
        if (resultItems.length > 0) {
            setResultItems([]);
        }

        setFlag(false);

        const id = setInterval(() => {
            setCounter(counter => counter - 1);
        }, 1000);

        setIntervalId(id);
    }

    const stopTimer = () => {
        setResultItems(() => generateResultItems());
        clearInterval(intervalId);
        setCounter(WAITING_TIME);
        setFlag(true);
    }

    const handleRoll = () => {
        if (flag === false || players.length === 0) return;
        startTimer();
    }

    const handleReset = () => {
        clearTimeout(timerId.current);
        clearInterval(intervalId);
        setResultItems([]);
        setCounter(WAITING_TIME);
        setFlag(true);
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

                <div className='w-[100px] h-[50px]'>
                    <button
                        className={`peer button--style ${showSettings ? 'button--clicked' : ''}`}
                        onClick={() => setShowSettings(show => !show)}
                    >Settings</button>

                    {
                        showSettings === false
                        && <div className='hidden peer-hover:flex hover:flex flex--center w-[20rem] p-2 bg-transparent border-black border-[2px] rounded mt-3'>
                            Remove all players to apply new settings
                        </div>
                    }
                </div>
            </div>

            <div className={`absolute flex--center flex-col section--style gap-3 w-[200px] top-[6rem] left-[10rem] border-black border-[4px] bg-gray-200 p-2 ${!showSettings ? 'hidden' : 'flex'}`}>
                <div className='flex--center flex-row select-none'>
                    <span className='flex-1'>Min bet: </span>
                    <input
                        type="number"
                        className={`w-[60%] border-black border-[3px] text-center ${players.length > 0 ? 'cursor-not-allowed' : ''}`}
                        step={DEFAULT_INPUT_STEP}
                        value={minBet < DEFAULT_MIN_BET ? DEFAULT_MIN_BET : minBet}
                        onChange={players.length > 0 ? undefined : (e) => setMinBet(e.target.value)}
                        min={DEFAULT_MIN_BET}
                        max={DEFAULT_MAX_BET * 2}
                    />
                </div>
                <div className='flex--center flex-row select-none'>
                    <span className='flex-1'>Max bet: </span>
                    <input
                        type="number"
                        className={`w-[60%] border-black border-[3px] text-center ${players.length > 0 ? 'cursor-not-allowed' : ''}`}
                        step={DEFAULT_INPUT_STEP}
                        value={maxBet > DEFAULT_MAX_BET * 2 ? DEFAULT_MAX_BET * 2 : maxBet}
                        onChange={players.length > 0 ? undefined : (e) => setMaxBet(e.target.value)}
                        min={DEFAULT_MIN_BET}
                        max={DEFAULT_MAX_BET * 2}
                    />
                </div>

            </div>

            <PlayerBoards
                players={players}
                flag={flag}
                counter={counter}
                resultItems={resultItems}
                calculateWinningMoney={calculateWinningMoney}
                setPlayersWinningMoney={handleSetPlayersWinningMoney}
            />

            <AddPlayerBox
                boxOpen={boxOpen}
                setBoxOpen={setBoxOpen}
                players={players}
                currentPlayerId={currentPlayerId}
                handleAddPlayer={handleAddPlayer}
                handleRemovePlayer={handleRemovePlayer}
                handleEditPlayer={handleEditPlayer}
                handleRemoveAllPlayers={handleRemoveAllPlayers}
                handleSetPlayer={handleSetPlayer}
                handleSetPlayerBetInfo={handleSetPlayerBetInfo}
                betRange={betRange}
            />

            <ResultInfo
                resultItems={resultItems}
                counter={counter}
                flag={flag}
            />

            <div className='w-[8rem] h-[3rem]'>
                <button
                    className={`button--style button--hover ${flag === true ? '' : 'button--clicked cursor-not-allowed'}`}
                    onClick={handleRoll}
                >Roll</button>
            </div>

            <div className='w-[8rem] h-[3rem]'>
                <button
                    className={`button--style button--hover`}
                    onClick={handleReset}
                >Reset</button>
            </div>

            <div className='w-[8rem] h-[3rem]'>
                <button
                    className={`peer button--style button--hover ${!flag ? 'button--clicked cursor-not-allowed' : ''} ${players.length === 0 && 'button--warn'}`}
                    onClick={() => flag === true ? setBoxOpen(true) : false}
                >Add Player</button>

                {
                    players.length === 0
                    && <div className='hidden peer-hover:flex hover:flex flex--center w-[120%] p-2 bg-transparent border-black border-[2px] rounded mt-3'>
                        No Players
                    </div>
                }

            </div>
        </>
    )
}
