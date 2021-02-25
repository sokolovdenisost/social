import React, {useState} from 'react'
import './Modal.css'

import photo from '../../icons/photo.png'
import {localURL} from "../../const";

export const Modal = ({active, setActive}) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        pathname: ''
    })

    const createGroup = () => {
        fetch(`${localURL}/group/create`, {
            method: "POST",
            body: JSON.stringify({...form}),
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.message === 'URL такой уже занят') {
                    console.log('asd')
                } else if (res.message === 'Группа успешно создана') {
                    window.location.reload(true)
                }
            })
    }

    const changeInput = (e) => {
        setForm({...form, [e.target.id]: e.target.value})

        console.log(form)
    }

    return(
        <div className={active ? "modal-overlay__create active" : "modal-overlay__create"} onClick={() => setActive(false)}>
            <div className="modal-window__create" onClick={e => e.stopPropagation()}>
                <div className="modal-body__create">
                    <div className="modal-body__form">
                        <div className="modal-body__form-photo">
                            <img src={photo} alt=""/>
                            <label htmlFor="groupPhoto">Загрузить фото</label>
                            <input
                                type="file"
                                id="groupPhoto"
                                onChange={changeInput}
                            />
                        </div>
                        <div className="modal-body__form-main">
                            <label htmlFor="name">Название группы:</label>
                            <input
                                type="text"
                                id="name"
                                onChange={changeInput}
                            />
                            <label htmlFor="description">Описание группы:</label>
                            <input
                                type="text"
                                id="description"
                                onChange={changeInput}
                            />
                            <label htmlFor="pathname">URL группы:</label>
                            <input
                                type="text"
                                id="pathname"
                                placeholder="Например: group"
                                onChange={changeInput}
                            />
                        </div>
                        <button className="create-group" onClick={createGroup}>
                            Создать группу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}