import React from 'react'
import './Profile.css'

import groups from "../../icons/groups.png";
import photo from "../../icons/photos.png";
import add from '../../icons/add.png'
import del from '../../icons/delete.png'
import send from '../../icons/send.png'
import message from '../../icons/message_profile.png'

import {Button} from "../../components/Navigation/Navigation";
import {Input} from "../../components/UI/Input/Input";
import {Post} from "../../components/Post/Post";
import {ProfileButton} from '../../components/UI/Button/Button'
import {ProfileFriends} from "../../components/ProfileFriends/ProfileFriends";
import {localURL} from "../../const";
import {Loader} from "../../components/Loader/Loader";

const button = [
    {
        title: 'Добавить в друзья',
        image: add,
        color: '#58E018'
    },
    {
        title: 'Удалить из друзей',
        image: del,
        color: '#FF0000'
    },
    {
        title: 'Заявка отправлена',
        image: send,
        color: '#000000'
    },
    {
        title: 'Принять заявку',
        image: add,
        color: '#58E018'
    },
    {
        title: 'Написать сообщение',
        image: message,
        color: '#0502A3'
    }
]

export class Profile extends React.Component{
    state = {
        loading: true,
        profile: {},
        check: {
            title: '',
            image: '',
            color: ''
        },
        createPost: {
            description: '',
            photos: [],
            id: null
        }
    }

    async componentDidMount() {
        await fetch(`${localURL}/friend${window.location.pathname}`)
            .then(res => res.json())
            .then(res => {
                if (res.message === 'Добавить в друзья') {
                    this.setState({
                        check: {
                            title: button[3].title,
                            image: button[3].image,
                            color: button[3].color
                        }
                    })
                    console.log('Добавить в друзья')
                } else if (res.message === 'Отменить заявку') {
                    this.setState({
                        check: {
                            title: button[2].title,
                            image: button[2].image,
                            color: button[2].color
                        }
                    })
                    console.log('Отменить заявку')
                } else if (res.message === 'Удалить из друзей') {
                    this.setState({
                        check: {
                            title: button[1].title,
                            image: button[1].image,
                            color: button[1].color
                        }
                    })
                    console.log('Удалить из друзей')
                } else if (res.message === 'Это ваш аккаунт') {
                    this.setState({
                        loading: true
                    })
                } else if (res.message === 'Отправить заявку') {
                    this.setState({
                        check: {
                            title: button[0].title,
                            image: button[0].image,
                            color: button[0].color
                        }
                    })
                }
            })

        await fetch(`${localURL}/auth${window.location.pathname}`)
            .then(res => res.json())
            .then(res => this.setState({
                profile: res,
                loading: false
            }))
    }

    render() {
        const buttons = [
            {
                title: 'Сообщества',
                image: groups,
                href: '/groups'
            },
            {
                title: 'Фотографии',
                image: photo,
                href: '/photos'
            },
            {
                title: "Подписчики",
                image: "",
                href: '/followers'
            }
        ]


        const friendHandler = () => {
            if (!this.state.loading) {
                fetch(`${localURL}/friend/add`, {
                    method: "POST",
                    body: JSON.stringify({...this.state.profile}),
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .catch(e => console.log(e))
            }
        }

        const createPost = (e) => {
            if (e.key === 'Enter') {
                fetch(`${localURL}/post/create`, {
                    method: "POST",
                    body: JSON.stringify({...this.state.createPost}),
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.message === 'Пост создан без картинок' || 'Пост создан с картинками') {
                            window.location.reload(true)
                        }
                    })
                    .catch(e => console.log(e))
            }
        }

        const changeInput = (e) => {
            this.setState({
                createPost: {
                    description: e.target.value,
                    id: this.state.profile.user._id
                }
            })
        }

        const mapButtons = buttons.map(b => {
            return <Button title={b.title} image={b.image} href={b.href} key={b.title} />
        })

        const mapPost = !this.state.loading
            ? this.state.profile.user.posts.length > 0
                ? this.state.profile.user.posts.map(f => {
                    return <Post
                        id={f.postId._id}
                        liked={f.postId.liked}
                        user={f.userCreate}
                        description={f.postId.description}
                        key={f._id}
                        photos={f.postId.photos}
                    />
                }).reverse()
                : <div className="profile-no-post">
                    Постов пока что нету
                </div>
            : null

        console.log(this.state.profile)

        return(
            <>
                {this.state.loading ? <Loader /> :
                <div className="profile-page">
                    <div className="profile-rof">
                        <div className="profile-rof__info-image">
                            <img src={this.state.profile.user.profilePhoto} alt="" className="profile-rof__image"/>
                            <div className="profile-rof__info">
                                <div className="profile-rof__fullname">{this.state.profile.user.name + ' ' + this.state.profile.user.surname}</div>
                                <div className="profile-rof__login">{'@' + this.state.profile.user.login}</div>
                            </div>
                        </div>
                        <div className="profile-rof__buttons">
                            <div className="profile-rof__button">
                                {mapButtons}
                            </div>
                        </div>
                    </div>
                    <div className="profile-body">
                        <div className="profile-left">
                            <Input
                                id="description"
                                placeholder={"Что у вас нового?"}
                                value={this.state.createPost.description}
                                onChange={changeInput}
                                onKeyPress={createPost}
                            />
                            {mapPost}
                        </div>
                        <div className="profile-right">
                            {`/profile/${this.props.user.login}` !== window.location.pathname ?
                                <>
                                    <ProfileButton
                                        title={this.state.check.title}
                                        image={this.state.check.image}
                                        color={this.state.check.color}
                                        key={this.state.check.title}
                                        onClick={friendHandler}
                                    />
                                    <ProfileButton
                                        title={button[4].title}
                                        image={button[4].image}
                                        color={button[4].color}
                                        key={button[4].title}
                                    />
                                </>
                                : null}
                            <ProfileFriends friends={this.state.profile.user.friends} />
                        </div>
                    </div>
                </div> }
            </>
        )
    }
}