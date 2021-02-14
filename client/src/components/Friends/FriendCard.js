import React from 'react'
import './Friends.css'

import message_friend from '../../icons/message_friend.png'
import delete_friend from '../../icons/delete_friend.png'

export const FriendCard = ({setActive, ...props}) => {
    return (
        <div className="friend-card">
            <a href={'/profile/' + props.login}>
                <div className="friend-card__fullname">{props.name + ' ' + props.surname}</div>
                <img src={props.profilePhoto} alt="" className="friend-img"/>
            </a>
            <div className="friend-buttons">
                <button className="friend-button message">
                    <img src={message_friend} alt="" />
                    <span>Сообщение</span>
                </button>
                <button className="friend-button" onClick={() => setActive(true)}>
                    <img src={delete_friend} alt="" />
                </button>
            </div>
        </div>
    )
}