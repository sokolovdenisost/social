import React from 'react'
import './Modal.css'

import photo from '../../icons/photo.png'

export const Modal = ({active, setActive}) => {
    return(
        <div className={active ? "modal-overlay__create active" : "modal-overlay__create"} onClick={() => setActive(false)}>
            <div className="modal-window__create" onClick={e => e.stopPropagation()}>
                <div className="modal-body__create">
                    <div className="modal-body__form">
                        <div className="modal-body__form-photo">
                            <img src={photo} alt=""/>
                            <label htmlFor="groupPhoto">Загрузить фото</label>
                            <input type="file" id="groupPhoto" />
                        </div>
                        <div className="modal-body__form-main">
                            <label htmlFor="name">Название группы:</label>
                            <input type="text" id="name" />
                            <label htmlFor="description">Описание группы:</label>
                            <input type="text" id="description" />
                            <label htmlFor="description">URL группы:</label>
                            <input type="text" id="pathname" placeholder="Например: group" />
                        </div>
                        <button className="create-group">
                            Создать группу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}