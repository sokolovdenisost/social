import React from 'react'
import './Confirmation.css'

import close from '../../icons/close.png'

export const Confirmation = ({active, setActive, ...props}) => {
    return (
        <div className={active ? "confirmation-overlay active" : "confirmation-overlay"} onClick={() => setActive(false)}>
            <div className={active ? "confirmation-window active" : "confirmation-window"} onClick={e => e.stopPropagation()}>
                <div className="confirmation-header">
                    <div className="confirmation-title">Подтверждение</div>
                    <img className="confirmation-close" src={close} alt="" onClick={() => setActive(false)} />
                </div>
                <div className="confirmation-body">
                    {props.text}
                </div>
                <div className="confirmation-footer">
                    <button className="confirmation-button delete">{props.button}</button>
                    <button className="confirmation-button close" onClick={() => setActive(false)}>Отменить</button>
                </div>
            </div>
        </div>
    )
}