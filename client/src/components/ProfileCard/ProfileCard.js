import React from 'react'
import './ProfileCard.css'
import notification from '../../icons/notification.png'

import image from '../../icons/musicImg.png'
import next from '../../icons/skip_next.png'
import prev from '../../icons/skip_previous.png'
import play from '../../icons/play.png'

export const ProfileCard = (props) => {

    return (
        <div className="profile-card">
            <div className="profile-card__rof">
                <img src={props.user.profilePhoto} alt="" className="profile-card__image"/>
                <div className="profile-card__info">
                    <div className="profile-card__fullname">{props.user.name + ' ' + props.user.surname}</div>
                    <div className="profile-card__login">{'@' + props.user.login}</div>
                </div>
                <div className="profile-card__notification">
                    <img src={notification} alt=""/>
                </div>
            </div>
            <div className="profile-card__body">
                <img src={image} alt="" className="profile-card__body-music__image"/>
                <div className="profile-card__body-info">
                    <div className="profile-card__body-info__rof">
                        <div className="profile-card__body-music__info">
                            <div className="profile-card__body-music__name">Название песни</div>
                            <div className="profile-card__body-music__author">Исполнитель</div>
                        </div>
                        <div className="profile-card__body-music__images">
                            <img src={prev} alt=""/>
                            <img src={play} alt="" className="profile-card__body-music__play"/>
                            <img src={next} alt=""/>
                        </div>
                    </div>
                    <div className="profile-card__body-info__body">
                        <div className="profile-card__lines">
                            <div className="profile-line__all"/>
                            <div className="profile-line__noall"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}