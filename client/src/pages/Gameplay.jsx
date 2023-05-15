import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios';

import GameplayInfo from '../components/game/GameplayInfo';
import useGameplayData from '../hooks/useGameplayData';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Gameplay() {
    const { userData, setUserData } = useGameplayData();
    const { auth, setAuth } = useAuth();

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const axiosWithInterceptors = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
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
    }, [])

    useEffect(() => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            alert("Game saved");
            return ev.returnValue = "Press CTRL+S or SAVE button to save the current data";
        });

        () => window.removeEventListener("beforeunload");
    }, []);

    useEffect(() => {
        const gameData = userData?.user?.gameData;
        window.addEventListener("keydown", function(e) {
            if (e.code === "KeyS" && (navigator.userAgentData.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                axiosPrivate.post('/update', JSON.stringify({ gameData }));
            }
        }, false);

        () => window.removeEventListener("keydown");
    }, []);

    return (
        <>
            <GameplayInfo isDataLoaded={isDataLoaded} />
        </>
    )
}

