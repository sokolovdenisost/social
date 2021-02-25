import React, {useState, useEffect} from 'react'
import './Group.css'

import photo from '../../../icons/profileBG.png'
import subscribe from '../../../icons/subscribe.png'
import unsub from '../../../icons/unsub.png'
import message from '../../../icons/message_profile.png'

import {ProfileButton} from "../../../components/UI/Button/Button";
import {localURL} from "../../../const";
import {Loader} from "../../../components/Loader/Loader";
import {GroupFollowers} from "../../../components/GroupsCard/GroupFollowers/GroupFollowers";
import {Input} from "../../../components/UI/Input/Input";
import {Post} from "../../../components/Post/Post";

const button = [
    {
        title: 'Подписаться',
        image: subscribe,
        color: '#58E018'
    },
    {
        title: 'Отписаться',
        image: unsub,
        color: '#FF0000'
    },
    {
        title: 'Написать сообщение',
        image: message,
        color: '#0502A3'
    }
]

export default function Group() {
    const [ready, setReady] = useState(true)
    const [group, setGroup] = useState({})
    const [news, setNews] = useState({
        description: '',
        photos: []
    })
    const [buttonMain, setButtonMain] = useState({
        title: '',
        image: '',
        color: ''
    })

    useEffect(() => {
        fetch(`${localURL}${window.location.pathname}`)
            .then(res => res.json())
            .then(res => {
                if (res.message === 'Отписаться') {
                    setGroup(res.group)
                    setReady(false)
                    setButtonMain({
                        title: button[1].title,
                        image: button[1].image,
                        color: button[1].color
                    })
                } else if (res.message === 'Подписаться') {
                    setGroup(res.group)
                    setReady(false)
                    setButtonMain({
                        title: button[0].title,
                        image: button[0].image,
                        color: button[0].color
                    })
                }
            })
    }, [])

    console.log(group)

    const changeInput = (e) => {
        setNews({...news, [e.target.id]: e.target.value})
    }

    const createPost = (e) => {
        if (e.key === 'Enter') {
            fetch(`${localURL}${window.location.pathname}/post`, {
                method: "POST",
                body: JSON.stringify({...news}),
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.message === 'Пост создан с картинками' || 'Пост создан без картинок') {
                        window.location.reload(true)
                    }
                })

            console.log(`${localURL}${window.location.pathname}/post`)
        }
    }

    const subs = () => {
        fetch(`${localURL}/group/subscribe`, {
            method: "POST",
            body: JSON.stringify({...group}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .catch(e => console.log(e))
    }

    const mapPosts = !ready ?
        group.groupPosts.length > 0 ?
            group.groupPosts.map(f => {
                return <Post
                    id={f.postId._id}
                    liked={f.postId.liked}
                    user={f.userCreate}
                    description={f.postId.description}
                    key={f._id}
                    photos={f.postId.photos}
                />
            }).reverse()
            : <div className="group-no-post">
                Постов пока что нету
            </div>
        : null

    return(
        <>
            {
                ready
                    ? <Loader />
                    : <div className="group-page">
                        <div className="group-page__rof">
                            <div className="group-background">
                                <img src={photo} alt=""/>
                            </div>
                            <div className="group-page__info">
                                <img src={group.groupPhoto} alt=""/>
                                <div className="group-info">
                                    {group.name}
                                </div>
                            </div>
                        </div>
                        <div className="group-page__body">
                            <div className="group-page__left">
                                <div className="group-page__description">
                                    <div className="group-page__title">О нас</div>
                                    <div className="group-page__descr">
                                        {group.description}
                                    </div>
                                </div>
                                {
                                    group.private.access ?
                                        <Input
                                            id="description"
                                            placeholder='Добавить новость'
                                            onChange={changeInput}
                                            onKeyPress={createPost}
                                        />
                                        : null
                                }
                                {mapPosts}
                            </div>
                            <div className="group-page__right">
                                <ProfileButton
                                    title={buttonMain.title}
                                    image={buttonMain.image}
                                    color={buttonMain.color}
                                    onClick={subs}
                                />
                                <ProfileButton
                                    title={button[2].title}
                                    image={button[2].image}
                                    color={button[2].color}
                                />
                                <GroupFollowers followers={group.followers} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}