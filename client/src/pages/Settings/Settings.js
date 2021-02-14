import React, {useState} from 'react';
import './Settings.css';

import photo from '../../icons/photo.png';

export default function Settings(props) {
    const [form, setForm] = useState({
        name: props.user.name,
        surname: props.user.surname,
        file: '',
        birthDay: '',
        country: 'Russia',
        city: 'Ostashkov'
    })

    const changeInputHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="settings-page">
            <div className="settings-rof">Основные настройки</div>
            <div className="settings-body">
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
                            type="text"
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
    );
}
