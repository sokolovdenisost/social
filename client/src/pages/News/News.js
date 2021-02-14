import React from 'react'
import './News.css'
import {Input} from "../../components/UI/Input/Input";
import {Post} from "../../components/Post/Post";

export default class News extends React.Component{
    render() {
        return (
            <div className="news-page">
                <div className="news-left">
                    <Input placeholder={"Что у вас нового?"} />
                    {/*<Post />*/}
                </div>
                <div className="news-right">
                    <div className="news-block">

                    </div>
                </div>
            </div>
        )
    }
}