import React from 'react'
import './Music.css'
import {Input} from "../../components/UI/Input/Input";
import {MusicCard} from "../../components/Music/MusicCard/MusicCard";
import {AlbumCard} from "../../components/Music/AlbumCard/AlbumCard";

export default function Music() {
    return (
        <div className="music-page">
            <div className="music-page__rof">
                <Input placeholder="Поиск музыки" />
            </div>
            <div className="music-page__body">
                <div className="music-page__left">
                    <div className="music-page__albums">
                        <div className="music-page__albums-title">Альбомы и EP</div>
                        <div className="music-page__albums-all">
                            <AlbumCard />
                            <AlbumCard />
                            <AlbumCard />
                        </div>
                    </div>
                    <div className="music-page__my">
                        <MusicCard />
                    </div>
                </div>
                <div className="music-page__right">

                </div>
            </div>
        </div>
    )
}