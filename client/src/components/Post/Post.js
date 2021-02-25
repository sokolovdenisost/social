import React from 'react'
import './Post.css'

import dots from '../../icons/dots.png'
import like from '../../icons/like.png'
import comment from '../../icons/comment.png'
import repost from '../../icons/repost.png'

import {localURL} from "../../const";
import {PostEvent} from "./PostEvent/PostEvent";

export const Post = (props) => {
    const likePost = () => {
        fetch(`${localURL}/post/like`, {
            method: "POST",
            body: JSON.stringify({...props}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .catch(e => console.log(e))
    }

    return (
        <div className="post">
            <div className="post-rof">
                <div className="post-profile__info">
                    <img src={props.user.profilePhoto} alt="" className="post-profile__image"/>
                    <div className="post-profile__fullname">{props.user.name + ' ' + props.user.surname}</div>
                </div>
                <div className="post-dots">
                    <img src={dots} alt=""/>
                    <PostEvent />
                </div>
            </div>
            <div className="post-body">
                <div className="post-body__text">
                    {props.description}
                </div>
                {
                    props.photos.length > 0
                    ?   <div className="post-body__images">
                            <div className="post-body__big-image">
                                <img src={props.photos} alt=""/>
                            </div>
                        </div>
                    : null
                }
            </div>
            <div className="post-footer">
                <div className="post-footer__like" onClick={likePost}>
                    <input type="hidden" value={props.id}/>
                    <img src={like} alt=""/> <span>{props.liked.length}</span>
                </div>
                <div className="post-footer__comment">
                    <img src={comment} alt=""/> <span>100</span>
                </div>
                <div className="post-footer__share">
                    <img src={repost} alt=""/>
                </div>
            </div>
        </div>
    )
}