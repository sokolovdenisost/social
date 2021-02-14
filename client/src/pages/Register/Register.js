import React, {useState} from 'react'
import './Register.css'
import {localURL} from "../../const";
import {Error} from "../../components/Error/NoAuth/Error";

export default function Register() {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        login: '',
        password: '',
        more_password: '',
        email: ''
    })
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')

    function register() {
        fetch(`${localURL}/auth/register`,{
            method: "POST",
            body: JSON.stringify({...form}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(res => {
                if (res.message === 'Такой пользователь уже существует') {
                    setError(true)
                    setErrorText('Такой пользователь уже существует')
                } else if (res.message === 'Заполните все поля') {
                    setError(true)
                    setErrorText('Заполните все поля')
                }
            })
            .catch(e => console.log(e))
    }

    const changeInputs = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className="register-page">
            <Error active={error} setActive={setError} text={errorText} />
            <div className="register-block">
                <div className="register-rof">Регистрация</div>
                <div className="register-body">
                    <div className="register-form">
                        <label htmlFor="name">Имя:</label>
                        <input type="text" name="name" id="name" onChange={changeInputs} />
                        <label htmlFor="surname">Фамилия:</label>
                        <input type="text" name="surname" id="surname" onChange={changeInputs} />
                        <label htmlFor="login">Логин:</label>
                        <input type="text" name="login" id="login" onChange={changeInputs} />
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" name="password" id="password" onChange={changeInputs} />
                        <label htmlFor="more_password">Повторение пароля:</label>
                        <input type="password" name="more_password" id="more_password" onChange={changeInputs} />
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email" onChange={changeInputs} />
                        <button className="register-in" onClick={register}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
                <div className="register-footer">
                    Если есть аккаунт, <a href="/">войдите</a>
                </div>
            </div>
        </div>
    )
}