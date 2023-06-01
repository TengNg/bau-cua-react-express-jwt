import { useEffect, useState } from 'react';
import Alert from './Alert';
import BoxWrapper from './BoxWrapper';

const ADD_MORE_MONEY_OPTIONS = [5_000, 10_000, 20_000];
const BET_SIZE_OPTIONS = [5_000, 10_000, 20_000];

export default function SettingsMenu({ userData, setUserData, settingsOpen, setSettingsOpen }) {
    const [alert, setAlert] = useState({ show: false, msg: "", duration: 3000 });

    const showAlert = (show, msg, duration = 2000) => {
        setAlert({ show, msg, duration });
    };

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
        if (userData.user.gameData.totalMoney + val > 200_000) {
            showAlert(true, 'Maximum $200,000');
        } else {
            setUserData(prevData => {
                const newData = { ...prevData };
                newData.user.gameData.totalMoney += val;
                return newData;
            });
        }
    };

    const handleCloseSettings = (e) => {
        if (e.currentTarget !== e.target) return;
        setSettingsOpen(false);
    }

    return (
        <>
            <BoxWrapper
                handleClose={handleCloseSettings}
                isOpen={settingsOpen}
                displayStringStyle={'grid place-items-center'}
            >
                <div className='w-[60%] h-[60%] flex--center flex-row section--style bg-gray-300 gap-6 cursor-auto'>
                    <section className='flex--center flex-col section--style min-w-[30%] p-5 gap-3 h-[60%]'>
                        <h3 className='font-bold'>Change bet size: </h3>
                        {BET_SIZE_OPTIONS.map((num, idx) => {
                            return (
                                <div key={idx} className='w-[70%] h-[3rem]'>
                                    <button
                                        className={`button--style ${betSize === num ? 'button--clicked bg-gray-400 text-white' : ''}`}
                                        onClick={() => setBetSize(num)}
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

                {alert.show && <Alert showAlert={showAlert} {...alert} />}

            </BoxWrapper>
        </>
    )
}
