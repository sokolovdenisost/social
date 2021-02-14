import React from 'react'
import './Navigation.css'
import house from '../../icons/house.png'
import friends from '../../icons/friends.png'
import news from '../../icons/news.png'
import videos from '../../icons/videos.png'
import groups from '../../icons/groups.png'
import logout from '../../icons/logout.png'
import message from '../../icons/message.png'
import music from '../../icons/music.png'
import setting from '../../icons/setting.png'
import photo from '../../icons/photos.png'
import {localURL} from "../../const";


export const Button = (props) => {
    return (
        <a href={props.href} className="nav-btn" onClick={props.func}>
            <img src={props.image} alt=""/>
            <div className="nav-btn__text">{props.title}</div>
        </a>
    )
}

export const Navigation = (props) => {

    const buttons = [
        {
            title: 'Моя страница',
            image: house,
            href: `/profile/${props.user.login}`,
            func: null
        },
        {
            title: 'Новости',
            image: news,
            href: '/news',
            func: null
        },
        {
            title: 'Сообщения',
            image: message,
            href: '/message',
            func: null
        },
        {
            title: 'Друзья',
            image: friends,
            href: '/friends',
            func: null
        },
        {
            title: 'Сообщества',
            image: groups,
            href: '/groups',
            func: null
        },
        {
            title: 'Музыка',
            image: music,
            href: '/music',
            func: null
        },
        {
            title: 'Фотографии',
            image: photo,
            href: '/photos',
            func: null
        },
        {
            title: 'Видео',
            image: videos,
            href: '/videos',
            func: null
        },
        {
            title: 'Настройки',
            image: setting,
            href: '/settings',
            func: null
        },
        {
            title: 'Выйти',
            image: logout,
            href: '/logout',
            func: () => {
                fetch(`${localURL}/auth/logout`)
                    .then(res => res.json())
                    .catch(e => console.log(e))
            }
        }
    ]

    const mapButtons = buttons.map(b => {
        return <Button title={b.title} image={b.image} href={b.href} key={b.title} func={b.func} />
    })

    return (
        <div className="navigation">
            {mapButtons}
        </div>
    )
}