import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios';

import GameplayInfo from '../components/game/GameplayInfo';
import useGameplayData from '../hooks/useGameplayData';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Gameplay() {
    const { userData, setUserData } = useGameplayData();
    const { setAuth } = useAuth();

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const axiosWithInterceptors = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (Object.keys(userData).length === 0) {
            let isMounted = true;
            const controller = new AbortController();
            const getGameData = async () => {
                try {
                    const response = await axiosWithInterceptors.get('/gameplay', { signal: controller.signal });
                    if (isMounted) {
                        setUserData(response.data);
                        setAuth(response.data);
                        setIsDataLoaded(true);
                    }
                } catch (err) {
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
            getGameData();
            return () => {
                isMounted = false;
                setIsDataLoaded(false);
                controller.abort();
            }
        } else {
            setIsDataLoaded(true);
        }
    }, [])

    useEffect(() => {
        window.addEventListener("beforeunload", async (ev) => {
            ev.preventDefault();
            return ev.returnValue = "Press CTRL+S or SAVE button to save the current data";
        });

        () => window.removeEventListener("beforeunload");
    }, []);

    useEffect(() => {
        const gameData = userData?.user?.gameData;
        window.addEventListener("keydown", async function(e) {
            if (e.code === "KeyS" && (navigator.userAgentData.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                await axiosPrivate.post('/update', JSON.stringify({ gameData }));
                alert("Game saved");
            }
        }, false);

        () => window.removeEventListener("keydown");
    }, []);

    return (
        <>
            <GameplayInfo
                isDataLoaded={isDataLoaded}
                isLocalGameplay={false}
                userData={userData}
                setUserData={setUserData}
            />
        </>
    )
}

