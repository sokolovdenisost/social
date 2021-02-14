import React, {useState} from 'react'
import './Login.css'
import {localURL} from "../../const";
import {Error} from "../../components/Error/NoAuth/Error";

export default function Login() {
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')

    async function login() {
        await fetch(`${localURL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({...form}),
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message === 'Успешно зашли!') {
                    window.location.reload(true)
                } else if (res.message === 'Данные не правильные!') {
                    setError(true)
                    setErrorText('Данные не правильные!')
                } else if (res.message === 'Такого пользователя нету!') {
                    setError(true)
                    setErrorText('Такого пользователя нету!')
                }
            })
            .catch(e => console.log(e))
    }

    const changeInputs = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className="login-page">
            <Error active={error} setActive={setError} text={errorText} />
            <div className="login-block">
                <div className="login-rof">Вход</div>
                <div className="login-body">
                    <div className="login-form">
                        <label htmlFor="login">Логин:</label>
                        <input type="text" name="login" id="login" onChange={changeInputs} value={form.login} />
                        <label htmlFor="password">Пароль:</label>
                        <input type="text" name="password" id="password" onChange={changeInputs} value={form.password} />
                        <button type="button" className="login-in" onClick={login}>
                            Войти
                        </button>
                    </div>
                </div>
                <div className="login-footer">
                    Если нету аккаунта, <a href="/register">зарегистрируйтесь</a>
                </div>
            </div>
        </div>
    )
}