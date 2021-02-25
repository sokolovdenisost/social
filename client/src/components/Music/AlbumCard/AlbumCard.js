import React from 'react'
import './AlbumCard.css'

import image from '../../../icons/albumImg.png'
import exp from '../../../icons/exp.png'

export const AlbumCard = () => {
    return (
        <div className="album-block">
            <img src={image} alt=""/>
            <div className="album-info">
                <div className="album-name">
                    <span>Название альбома</span>
                    <img src={exp} alt=""/>
                </div>
                <div className="album-author">
                    Исполнитель
                </div>
                <div className="album-date">
                    2020
                </div>
            </div>
        </div>
    )
}