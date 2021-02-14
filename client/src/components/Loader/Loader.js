import React from 'react'
import './Loader.css'

export const Loader = () => {
    return (
        <div className="container-loader">
            <div className="lds-grid">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    )
}