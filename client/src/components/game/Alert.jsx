import React, { useEffect } from 'react'

export default function Alert({ showAlert, msg }) {

    useEffect(() => {
        const id = setTimeout(() => {
            showAlert(false, '');
        }, 2000)
        return () => clearTimeout(id)
    })

    return (
        <div>{msg}</div>
    )
}
