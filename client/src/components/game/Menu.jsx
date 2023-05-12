import { useEffect, useRef, useState } from 'react';
import useGameplayData from '../../hooks/useGameplayData';

const ADD_MORE_MONEY_OPTIONS = [5_000, 10_000, 20_000];
const BET_SIZE_OPTIONS = [5_000, 10_000, 20_000];

export default function Menu() {
    const { userData, setUserData } = useGameplayData();

    const [betSize, setBetSize] = useState(() => {
        return userData.user.gameData.betSize;
    });

    const wrapperRef = useRef();

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

    const handleBetSizeChanged = (e) => {
        setBetSize(+e.target.value);
    };


    return (
        <>
            <div ref={wrapperRef} className='w-[100%] h-[100%] bg-white bg-opacity-75 absolute grid place-items-center' >
                <button
                    className='absolute top-[5rem] right-[7rem] font-bold text-4xl border-black border-[5px] p-2 w-[5rem] h-[5rem] rounded-full'
                    onClick={() => wrapperRef.current.classList.toggle('hidden')}
                > X
                </button>
                <div className='w-[60%] h-[60%] flex flex-col justify-center items-center border-black border-[4px] p-3 absolute gap-1 bg-white'>
                    <section className='my-2 border-black border-[3px] p-4 w-fit'>
                        <h3 className='font-bold underline'>Change bet size: </h3>
                        {BET_SIZE_OPTIONS.map(num => {
                            return (
                                <label key={num} htmlFor={`bet-size-${num}`}>
                                    <input
                                        key={num}
                                        type="checkbox"
                                        value={num}
                                        checked={betSize === num}
                                        onChange={(e) => handleBetSizeChanged(e)}
                                    />
                                    ${num}
                                </label>
                            )
                        })}
                    </section>
                    <section className='border-black border-[3px] p-4 w-fit'>
                        <h3 className='font-bold underline'>Add more money: </h3>
                        {ADD_MORE_MONEY_OPTIONS.map((item, index) => {
                            return (
                                <div key={index} className='mt-4 p-2 border-[3px] border-black flex flex-row items-center w-[12rem]'>
                                    <p key={index + 10} className='flex-1'>${item}</p>
                                    <button
                                        key={index + 20}
                                        onClick={() => {
                                            handleAddMoreMoney(item);
                                        }}
                                        className='text-[0.75rem] font-bold border-[3px] border-black w-fit'>
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
