import React from 'react'
import './Message.css'

import {ProfileMessage} from "../../components/Message/Message";

import messagePhoto from '../../icons/message_photo.png'
import dots from '../../icons/dots30.png'
import file_message from '../../icons/file_message.png'
import send_message from '../../icons/send.png'

import {Input} from "../../components/UI/Input/Input";

export default function Message() {
    return(
        <div className="message-page">
            <div className="message-left">
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
                <ProfileMessage />
            </div>
            <div className="message-right">
                <div className="message-right__rof">
                    <div className="message-info">
                        <img src={messagePhoto} alt="" className="message-info__image"/>
                        <div className="message-info__fullname">
                            Денис Соколов
                        </div>
                    </div>
                    <div className="message-rof__dots">
                        <img src={dots} alt=""/>
                    </div>
                </div>
                <div className="message-right__body">

                </div>
                <div className="message-right__footer">
                    <div className="message-right__footer-block">
                        <img src={file_message} alt="" className="message-right__file"/>
                        <Input
                            placeholder={"Написать сообщение"}
                            width={"485px"}
                            border={"1px solid #D8D8D8"}
                            marginBottom={"0px"}
                        />
                        <img src={send_message} alt="" className="message-right__send"/>
                    </div>
                </div>
            </div>
        </div>
    )
}