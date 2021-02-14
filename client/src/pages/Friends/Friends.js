import React, {useState} from 'react'
import {FriendCard} from "../../components/Friends/FriendCard";
import './Friends.css'
import {Input} from "../../components/UI/Input/Input";
import {Confirmation} from "../../components/Confirmation/Confirmation";

export default function Friends(props) {
    const [deleteFriend, setDeleteFriend] = useState(false)

    const mapFriends = props.user.friends.map(f => {
        return <FriendCard
            profilePhoto={f.friendId.profilePhoto}
            login={f.friendId.login}
            name={f.friendId.name}
            surname={f.friendId.surname}
            key={f.friendId.login}
            setActive={setDeleteFriend}
        />
    })

    return (
        <>
            <Confirmation active={deleteFriend} setActive={setDeleteFriend} text={"Удалить из друзей?"} button={"Удалить"} />
            <div className="friends-page">
                {console.log(props.user)}
                <Input placeholder={"Поиск друзей"} />
                <div className="friends">
                    {mapFriends.length ? mapFriends : ''}
                </div>
            </div>
        </>
    )
}