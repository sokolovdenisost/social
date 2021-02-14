import React from 'react'
import './ProfileFriends.css'


const Friend = (props) => {
    return (
        <a href={'/profile/' + props.login} className="friend-profile">
            <img src={props.profilePhoto} alt="" className="friend-profile"/>
            <div style={{marginTop: 3}}>{props.name}</div>
        </a>
    )
}

export const ProfileFriends = (props) => {

    const mapFriends = props.friends.map(f => {
        return <Friend login={f.friendId.login} profilePhoto={f.friendId.profilePhoto} name={f.friendId.name} key={f.friendId._id} />
    })

    return(
        <div className="profile-friends">
            <div className="profile-friends__rof">
                <span className="profile-friends__span">Друзья</span>
                <span className="profile-friends__span number">{props.friends.length}</span>
            </div>
            <div className="profile-friends__body">
                {props.friends.length ? mapFriends : <p>Друзей пока что нету</p>}
            </div>
        </div>
    )
}