import React from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import Title from '../components/Title.jsx';
import NavBar from '../components/NavBar';
import useAuth from '../hooks/useAuth';

export default function Home() {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const getRefreshToken = async () => {
        if (!auth?.accessToken) {
            console.log('no token');
            return;
        }
        const newAccessToken = await refresh();
        console.log(newAccessToken);
    };
    return (
        <>
            <Title />
            <NavBar />
            <div className='box-border border-4 border-black p-5'>
                <h1>Home</h1>
                <br />
                <button onClick={getRefreshToken} className=''>Refresh</button>
            </div>
        </>
    )
}
