import React from 'react'
import {localURL} from "../../const";
// import ReactHtmlParser from 'react-html-parser';

export class Image extends React.Component {
    state = {
        image: {},
        loading: true
    }

    componentDidMount() {
        fetch(`${localURL}${window.location.pathname}`)
            .then(res => res.json())
            .then(res => this.setState({
                image: res,
                loading: false
            }))
            .catch(e => console.log(e))
    }

    render() {
        return (
            <>
                {/*{*/}
                {/*    this.state.loading*/}
                {/*    ? ''*/}
                {/*    : <img src={ReactHtmlParser (this.state.image.originalname)} />*/}
                {/*}*/}
            </>
        )
    }
}