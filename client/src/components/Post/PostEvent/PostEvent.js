import React from 'react'
import './PostEvent.css'

export const PostEvent = () => {
    return (
        <div className="post-event">
            <ul className="post-event__items">
                <li className="post-event__item">
                    <button>Редактировать</button>
                </li>
                <li className="post-event__item">
                    <button>Удалить</button>
                </li>
                <li className="post-event__item">
                    <button>Пожаловаться</button>
                </li>
            </ul>
        </div>
    )
}