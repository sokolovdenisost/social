import React from 'react'
import './Error.css'

export const Error = ({active, setActive, ...props}) => {
    const errorFalse = setTimeout(() => setActive(false), 5000)

    return (
        <div className={active ? "error-block active" : "error-block"} onChange={() => errorFalse}>
            <div className="error-text">{props.text}</div>
        </div>
    )
}