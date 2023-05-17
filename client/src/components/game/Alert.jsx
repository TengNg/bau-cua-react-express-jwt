import React, { useEffect } from 'react'

export default function Alert({ showAlert, msg, duration }) {
    useEffect(() => {
        const id = setTimeout(() => {
            showAlert(false, '');
        }, duration);
        return () => clearTimeout(id)
    })

    return (
        <div className='absolute left-[2rem] bottom-[2rem] font-bold'>{msg}</div>
    )
}
