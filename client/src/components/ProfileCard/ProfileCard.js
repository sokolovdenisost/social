import React from 'react'
import './ProfileCard.css'
import notification from '../../icons/notification.png'

export const ProfileCard = (props) => {

    return (
        <div className="profile-card">
            <img src={props.user.profilePhoto} alt="" className="profile-card__image"/>
            <div className="profile-card__info">
                <div className="profile-card__fullname">{props.user.name + ' ' + props.user.surname}</div>
                <div className="profile-card__login">{'@' + props.user.login}</div>
            </div>
            <div className="profile-card__notification">
                <img src={notification} alt=""/>
            </div>
        </div>
    )
}