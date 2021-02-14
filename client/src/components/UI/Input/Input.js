import React from 'react'
import './Input.css'

export const Input = (props) => {
    return (
        <input
            id={props.id}
            type="text"
            className="input-add"
            placeholder={props.placeholder}
            style={{
                width: props.width || "550px",
                border: props.border || "none",
                marginBottom: props.marginBottom || "10px"
            }}
            value={props.value}
            onKeyPress={props.onKeyPress}
            onChange={props.onChange}
        />
    )
}