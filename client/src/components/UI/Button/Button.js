import React from 'react'
import './Button.css'

export const ProfileButton = (props) => {
    return(
        <button className="profile-button" onClick={props.onClick}>
            <div className="profile-button__info">
                <img src={props.image} alt=""/>
                <span style={{color: props.color}}>{props.title}</span>
            </div>
        </button>
    )
}

export const Button = (props) => {
    return (
        <button className="button-ui" onClick={props.onClick}>
            <div className="button-ui__body">
                <div className="button-ui__left">
                    +
                </div>
                <div className="button-ui__right">
                    Создать сообщество
                </div>
            </div>
        </button>
    )
}