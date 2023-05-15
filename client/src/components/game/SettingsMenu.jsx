import { useEffect, useRef, useState } from 'react';
import useGameplayData from '../../hooks/useGameplayData';

const ADD_MORE_MONEY_OPTIONS = [5_000, 10_000, 20_000];
const BET_SIZE_OPTIONS = [5_000, 10_000, 20_000];

export default function SettingsMenu({ settingsOpen, setSettingsOpen }) {
    const { userData, setUserData } = useGameplayData();

    const wrapperRef = useRef();

    useEffect(() => {
        if (settingsOpen === true) {
            wrapperRef.current.classList.remove('hidden');
            wrapperRef.current.classList.toggle('block');
        } else {
            wrapperRef.current.classList.remove('block');
            wrapperRef.current.classList.toggle('hidden');
        }
    }, [settingsOpen]);

    const [betSize, setBetSize] = useState(() => {
        return userData.user.gameData.betSize;
    });

    useEffect(() => {
        setUserData(prevData => {
            const newData = { ...prevData }
            newData.user.gameData.betSize = betSize;
            return newData;
        });
    }, [betSize]);

    const handleAddMoreMoney = (val) => {
        setUserData(prevData => {
            const newData = { ...prevData };
            if (newData.user.gameData.totalMoney + val <= 200_000) {
                newData.user.gameData.totalMoney += val;
            }
            return newData;
        });
    };

    const handleChangeBetSize = (e) => {
        const value = e.target.innerText.substring(1);
        setBetSize(+value);
    };

    const handleCloseSettings = (e) => {
        if (e.currentTarget !== e.target) return;
        setSettingsOpen(false);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className='w-[100%] h-[100%] bg-white bg-opacity-75 absolute grid place-items-center cursor-pointer'
                onClick={(e) => handleCloseSettings(e)}
            >
                <div className='w-[60%] h-[60%] flex--center flex-row section--style bg-gray-300 gap-6 cursor-auto'>
                    <section className='flex--center flex-col section--style min-w-[30%] p-5 gap-3 h-[60%]'>
                        <h3 className='font-bold'>Change bet size: </h3>
                        {BET_SIZE_OPTIONS.map((num, idx) => {
                            return (
                                <div key={idx} className='w-[70%] h-[3rem]'>
                                    <button
                                        className={`button--style ${betSize === num ? 'button--clicked bg-gray-400 text-white' : ''}`}
                                        onClick={(e) => handleChangeBetSize(e)}
                                    >
                                        ${num}
                                    </button>
                                </div>
                            )
                        })}
                    </section>
                    <section className='section--style flex--center flex-col p-5 gap-3 min-w-[30%] h-[60%]'>
                        <h3 className='font-bold'>Add more money: </h3>
                        {ADD_MORE_MONEY_OPTIONS.map((item, index) => {
                            return (
                                <div key={index} className='p-2 border-[4px] border-black flex flex-row items-center w-[90%] font-bold text-center bg-white'>
                                    <p key={index + 10} className='flex-1'>${item}</p>
                                    <button
                                        key={index + 20}
                                        onClick={() => handleAddMoreMoney(item)}
                                        className='text-[0.75rem] font-bold border-[3px] border-black w-[2rem] h-[2rem] hover:bg-gray-400 hover:text-white transition all'
                                    >
                                        +
                                    </button>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </div>
        </>
    )
}
