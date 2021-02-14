import React from 'react'
import './GroupsCard.css'

import dots from '../../icons/dots_group.png'
import subscribe from '../../icons/subscribe.png'
import unsub from '../../icons/unsub.png'
import {localURL} from "../../const";

export const GroupsCard = ({setActive, ...props}) => {

    const unSub = () => {
        fetch(`${localURL}/group/subscribe`, {
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

    console.log(props)

    return (
        <div className="group-card">
            <a href={'/group/' + props.pathname}>
                <div className="group-card__rof">
                    {props.name}
                </div>
                <div className="group-card__body">
                    <img src={props.groupPhoto} alt=""/>
                </div>
            </a>
            <div className="group-card__footer">
                <button className="group-card__subscribe" onClick={unSub}>
                    <img src={unsub} alt=""/>
                    <span>Отписаться</span>
                </button>
                <button className="group-card__info" onClick={props.onClick}>
                    <img src={dots} alt=""/>
                </button>
            </div>
        </div>
    )
}