import React from 'react'
import './ModalGroupInfo.css'

export const ModalGroupInfo = ({active, setActive}) => {
    return (
        <div className={active ? "modal-group__overlay active" : "modal-group__overlay"} onClick={() => setActive(false)}>
            {
                active
                ? <div className={active ? "modal-group__window active" : "modal-group__window"} onClick={e => e.stopPropagation()}>
                    <img src={active.groupId.groupPhoto} alt="" className="modal-group__image"/>
                    <div className="modal-group__info">
                        <div className="modal-group__info-rof">
                            <div className="modal-group__info-title">
                                {active.groupId.name}
                            </div>
                            <div className="modal-group__info-category">
                                категория
                            </div>
                        </div>
                        <div className="modal-group__info-body">
                            <button className="modal-group__info-button">
                                <div className="modal-group__info-button__number">{active.groupId.followers.length}</div>
                                <div className="modal-group__info-button__title">Подписчиков</div>
                            </button>
                            <button className="modal-group__info-button">
                                <div className="modal-group__info-button__number">100</div>
                                <div className="modal-group__info-button__title">Видео</div>
                            </button>
                            <button className="modal-group__info-button">
                                <div className="modal-group__info-button__number">{active.groupId.groupPhotos.length}</div>
                                <div className="modal-group__info-button__title">Фотографий</div>
                            </button>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}