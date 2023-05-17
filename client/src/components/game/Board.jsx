import { useState, useEffect, useRef } from 'react';
import Item from './Item';
import ResultInfo from './ResultInfo';
import Alert from './Alert';
import useGameplayData from '../../hooks/useGameplayData';

import itemsData from '../../data/items.json';
import ItemBetLevelSelection from './ItemBetLevelSelection';

const WAITING_TIME = 3;

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
    const [alert, setAlert] = useState({ show: false, msg: "", duration: 3000 });
    const [flag, setFlag] = useState(true);
    const [counter, setCounter] = useState(WAITING_TIME);
    const [intervalId, setIntervalId] = useState();
    const [currentItemId, setCurrentItemId] = useState(null);

    const itemBetlLevelSelectionRef = useRef();
    const timerId = useRef(null);

    const selectedItems = items.filter(item => item.selected === true);

    useEffect(() => {
        if (flag === false) {
            timerId.current = setTimeout(() => {
                stopTimer();
            }, WAITING_TIME * 1000);
        }
        () => clearTimeout(timerId.current);
    }, [flag]);

    useEffect(() => {
        if (resultItems.length > 0) {
            const winningMoney = calculateWinningMoney(
                resultItems,
                selectedItems,
                userData.user.gameData.betSize
            );
            setUserData(prevData => {
                const newData = { ...prevData };
                newData.user.gameData.totalMoney += winningMoney;
                return newData;
            });

            if (winningMoney > 0) {
                showAlert(true, `Win: $${winningMoney}`, 5000);
            } else {
                showAlert(true, `Lose: $${winningMoney.toString().slice(1)}`, 5000);
            }
        }
    }, [resultItems]);

    const startTimer = () => {
        setFlag(false);
        setResultItems([]);
        const id = setInterval(() => {
            setCounter(counter => counter - 1);
        }, 1000);
        setIntervalId(id);
    };

    const stopTimer = () => {
        setResultItems(generateResultItems());
        clearInterval(intervalId);
        setCounter(WAITING_TIME);
        setFlag(true);
    };

    const showAlert = (show, msg, duration = 2000) => {
        setAlert({ show, msg, duration });
    };

    const handleSelectItem = (id) => {
        if (flag === false) return;
        setItems(currItems => [...currItems].map(item => item.id === id ? { ...item, selected: !item.selected } : item))
    };

    const handleOpenItemBetLevelSelection = (e) => {
        e.preventDefault();
        itemBetlLevelSelectionRef.current.classList.remove('hidden');
    };

    const handleBetLevelChanged = (value) => {
        if (flag === false) return;
        setItems(currItems => [...currItems].map(item => item.id === currentItemId ? { ...item, betLevel: value } : item));
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
            startTimer();
            setFlag(false);
            showAlert('', false);
        }
    };

    const handleReset = () => {
        clearTimeout(timerId.current);
        clearInterval(intervalId);
        setItems(currItems => [...currItems].map(item => item.selected ? { ...item, selected: false } : item));
        setResultItems([]);
        setCounter(WAITING_TIME);
        showAlert(false, '');
        setFlag(true);
    };

    return (
        <>
            <ItemBetLevelSelection
                ref={itemBetlLevelSelectionRef}
                items={items}
                handleBetLevelChanged={handleBetLevelChanged}
                currentItemId={currentItemId}
            />

            <section
                className='grid grid-cols-3 grid-rows-2 gap-3 p-4 items-center justify-items-center border-black border-[4px] shadow-[6px_8px_0_0_black] bg-gray-300'
            >
                {items.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            {...item}
                            setCurrentItemId={setCurrentItemId}
                            handleSelectItem={handleSelectItem}
                            handleOpenItemBetLevelSelection={handleOpenItemBetLevelSelection}
                        />
                    )
                })}
            </section>

            <div className='flex flex-row justify-center items-center w-[250px] h-[5rem] gap-7'>
                <div className='w-[100px] h-[50px]'>
                    <button
                        className={`button--style button--hover ${!flag ? 'button--clicked bg-gray-400' : ''}`}
                        onClick={handleRoll}
                    >Roll</button>
                </div>

                <div className='w-[100px] h-[50px]'>
                    <button
                        className='button--style button--hover'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <ResultInfo
                resultItems={resultItems}
                counter={counter}
                flag={flag}
            />

            {alert.show && <Alert showAlert={showAlert} {...alert} />}
        </>
    )
}
