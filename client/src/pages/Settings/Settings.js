import React, {useState} from 'react';
import './Settings.css';
import {Button} from "../../components/Navigation/Navigation";

import main_setting from '../../icons/main_settings.png'
import privacy from '../../icons/private.png'
import secury from '../../icons/secury.png'
import block from '../../icons/block.png'

export default function Settings(props) {
    const [form, setForm] = useState({
        name: props.user.name,
        surname: props.user.surname,
        file: '',
        birthDay: props.user.birthDay,
        country: 'Russia',
        city: 'Ostashkov'
    })

    const changeInputHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const buttons = [
        {
            title: "Основные настройки",
            image: main_setting,
            href: '#main'
        },
        {
            title: 'Приватность',
            image: privacy,
            href: '#private'
        },
        {
            title: 'Безопасность',
            image: secury,
            href: '#security'
        },
        {
            title: 'Черный список',
            image: block,
            href: '#blackList'
        },
        {
            title: '',
            image: '',
            href: ''
        }
    ]

    const mapButtons = buttons.map(b => {
        return <Button
            title={b.title}
            image={b.image}
            href={b.href}
            margin={'0px'}
            width={'150px'}
            marginAuto={'0px 56.5px'}
            key={b.title}
        />
    })

    return (
        <div className="settings-page">
            <div className="settings-menu">
                {mapButtons}
            </div>
            <div className="settings-body">
                <div className="settings-body__rof">Основные настройки</div>
                <div className="settings-body__main">
                    <div className="settings-left">
                        <img src={props.user.profilePhoto} alt="" />
                        <input type="file" name="file" id="file" onChange={changeInputHandler} />
                        <label htmlFor="file">Сменить фотографию</label>
                    </div>
                    <div className="settings-right">
                        <form className="setting-form">
                            <label htmlFor="name">Имя</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={changeInputHandler}
                                id="name"
                            />
                            <label htmlFor="surname">Фамилия</label>
                            <input
                                type="text"
                                name="surname"
                                value={form.surname}
                                onChange={changeInputHandler}
                                id="surname"
                            />
                            <label htmlFor="birthDay">Дата рождения</label>
                            <input
                                type="date"
                                name="birthDay"
                                value={form.birthDay}
                                onChange={changeInputHandler}
                                id="birthDay"
                            />
                            <label htmlFor="country">Страна</label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={changeInputHandler}
                                id="country"
                            />
                            <label htmlFor="city">Город</label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={changeInputHandler}
                                id="city"
                            />
                        </form>
                    </div>
                </div>
                <div className="settings-footer">
                    <button>Сохранить</button>
                </div>
            </div>
        </div>
    );
}
