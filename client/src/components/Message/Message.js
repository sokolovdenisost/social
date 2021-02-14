import React from 'react'
import './Message.css'

import photo_message from '../../icons/photo_message.png'

export const ProfileMessage = () => {
    return (
        <div className="profile-message">
            <img src={photo_message} alt="" className="profile-message__image"/>
            <div className="profile-message__fullname">Денис Соколов</div>
        </div>
    )
}