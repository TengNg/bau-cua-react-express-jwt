import { useState, useEffect } from 'react';
import Item from './Item';
import ResultInfo from './ResultInfo';
import Alert from './Alert';
import useGameplayData from '../../hooks/useGameplayData';

import itemsData from '../../data/items.json';

const WAITING_TIME = 8;

const generateResultItems = () => {
    const randomItems = []
    const data = [...itemsData];
    for (let i = 0; i < 3; i++) {
        randomItems.push(data[Math.floor(Math.random() * 6)]);
    }

    return randomItems.map(item => {
        return { ...item, canSelect: false }
    });
};

const calculateWinningMoney = (resultItems, selectedItems, winningMoneyPerItem) => {
    const resultTally = resultItems.reduce((obj, item) => {
        obj[item.name] = (obj[item.name] == null) ? 1 : obj[item.name] + 1
        return obj
    }, {});

    const winningMoney = selectedItems.reduce((total, currItem) => {
        const { betLevel } = currItem
        const m = winningMoneyPerItem * betLevel
        if (resultTally[currItem.name] === undefined) {
            total -= m * 1
        } else {
            total += m * resultTally[currItem.name]
        }
        return total
    }, 0)

    return winningMoney
}

export default function Board() {
    const { userData, setUserData } = useGameplayData();

    const [items, setItems] = useState(itemsData);
    const [resultItems, setResultItems] = useState([]);
    const [alert, setAlert] = useState({ show: false, msg: "" })
    const [flag, setFlag] = useState(true);
    const [counter, setCounter] = useState(WAITING_TIME);
    const [intervalId, setIntervalId] = useState();

    const selectedItems = items.filter(item => item.selected === true);

    const startTimer = () => {
        const id = setInterval(() => {
            setCounter(counter => counter - 1)
        }, 1000)
        setIntervalId(id)
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setItems(itemsData);
        setCounter(WAITING_TIME);
        showAlert(false, '');
        setResultItems([])
        setFlag(true);
    };

    useEffect(() => {
        let timer = null
        if (resultItems.length > 0) {
            setUserData(prevData => {
                const newData = { ...prevData };
                newData.user.gameData.totalMoney += calculateWinningMoney(
                    resultItems,
                    selectedItems,
                    prevData.user.gameData.betSize
                );
                return newData;
            });
            timer = setTimeout(() => {
                setItems(itemsData);
                setResultItems([])
                setFlag(true);
                stopTimer();
            }, WAITING_TIME * 1000);
        }
        return () => clearTimeout(timer)
    }, [resultItems])

    const showAlert = (show, msg) => {
        setAlert({ show, msg });
    };

    const handleSelect = (id) => {
        if (flag === false) return;
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, selected: !item.selected } : item))
    };

    const handleBetLevelChanged = (id, value) => {
        if (flag === false) return;
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, betLevel: value } : item))
    };

    const handleRoll = () => {
        if (flag === false) return;

        const totalBetLevel = selectedItems.reduce((total, item) => total + +item.betLevel, 0);
        const { totalMoney, betSize } = userData?.user?.gameData;

        if (selectedItems.length === 0) {
            showAlert(true, 'Please select item');
        } else if (totalMoney === 0) {
            showAlert(true, 'No money, please add more');
        } else if (totalBetLevel * betSize > totalMoney) {
            showAlert(true, 'BetMoney > CurrentMoney');
        } else {
            startTimer()
            setFlag(false)
            showAlert(true, 'Waiting...')
            setResultItems(() => generateResultItems());
        }
    };

    const handleReset = () => {
        stopTimer();
    };

    return (
        <>
            <section
                className='flex flex-wrap justify-center items-center w-[350px] h-[250px] gap-2 border-black border-[4px] shadow-[6px_8px_0_0_black]'
                onClick={handleSelect}
            >
                {items.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            {...item}
                            handleSelect={handleSelect}
                            handleBetLevelChanged={handleBetLevelChanged}
                        />
                    )
                })}
            </section>

            <div className='flex flex-row justify-center items-center w-[250px] h-[5rem] gap-7'>
                <button
                    className='border-black border-[4px] w-[100px] h-[50px] shadow-[4px_4px_0_0_black] select-none hover:shadow-gray-500 hover:text-gray-500 hover:border-gray-500 transition-all font-bold'
                    onClick={handleRoll}
                >
                    Roll
                </button>

                <button
                    className='border-black border-[4px] w-[100px] h-[50px] shadow-[4px_4px_0_0_black] select-none hover:shadow-gray-500 hover:text-gray-500 hover:border-gray-500 transition-all font-bold'
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>

            <ResultInfo
                resultItems={resultItems}
            />

            {flag === false && <p className='text-gray-700'>Waiting: {counter}s. Please check your result</p>}

            {alert.show && <Alert showAlert={showAlert}{...alert} />}
        </>
    )
}
