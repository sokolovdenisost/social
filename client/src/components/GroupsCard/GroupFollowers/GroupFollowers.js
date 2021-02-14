import React from 'react'
import './GroupFollowers.css'

const Follower = (props) => {
    return (
        <a href={'/profile/' + props.login} className="follower-profile">
            <img src={props.profilePhoto} alt="" className="follower-profile"/>
            <div style={{marginTop: 3}}>{props.name}</div>
        </a>
    )
}

export const GroupFollowers = (props) => {

    const mapFollowers = props.followers.map(f => {
        return <Follower
            login={f.followerId.login}
            profilePhoto={f.followerId.profilePhoto}
            name={f.followerId.name}
            key={f.followerId._id}
        />
    })

    return (
        <div className="profile-followers">
            <div className="profile-followers__rof">
                <span className="profile-followers__span">Подписчиков</span>
                <span className="profile-followers__span number">{props.followers.length}</span>
            </div>
            <div className="profile-followers__body">
                {props.followers.length ? mapFollowers : <p>Подписчиков пока что нету</p>}
            </div>
        </div>
    )
}