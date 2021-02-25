import React from 'react'
import './MusicCard.css'

import prev from '../../../icons/skip_previous.png'
import play from '../../../icons/play.png'
import next from '../../../icons/skip_next.png'
import image from '../../../icons/musicImg.png'
import exp from '../../../icons/exp.png'
import add from '../../../icons/add_music.png'

export const MusicCard = () => {
    return (
        <div className="music-card">
            <div className="music-card__buttons">
                <img src={prev} alt=""/>
                <img src={play} alt=""/>
                <img src={next} alt=""/>
            </div>
            <img src={image} alt="" className="music-img"/>
            <div className="music-card__info">
                <div className="music-card__info-rof">
                    <div className="music-card__info-name">
                        <span>Название музыки</span>
                        <img src={exp} alt=""/>
                    </div>
                    <div className="music-card__info-author">
                        Исполнитель
                    </div>
                </div>
                <div className="music-card__info-body">
                    <div className="music-card__info-time">
                        3:00
                    </div>
                    <div className="music-card__line">
                        <div className="line-all"/>
                        <div className="line-noall"/>
                        <div className="dot"/>
                    </div>
                </div>
            </div>
            <div className="music-card__volume">
                <div className="music-card__volume-lines">
                    <div className="line-all__volume"/>
                    <div className="line-noall__volume"/>
                </div>
            </div>
            <img src={add} alt="" className="add_music"/>
        </div>
    )
}