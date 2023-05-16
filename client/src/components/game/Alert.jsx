import React, { useEffect } from 'react'

export default function Alert({ showAlert, msg }) {
    useEffect(() => {
        const id = setTimeout(() => {
            showAlert(false, '');
        }, 3000)
        return () => clearTimeout(id)
    })

    return (
        <div className='absolute left-[2rem] bottom-[2rem] font-bold'>{msg}</div>
    )
}
