import React from 'react'
import './AuthInput.scss'

const AuthInput = (props) => {
    return (
        <div className="authInput">
            <label htmlFor={props.name} className="authInput-title">{props.title}</label>
            <input
                id={props.name}
                type={props.type}
                value={props.value}
                name={props.name}
                onChange={e => props.onChange(e.target.value)}
            />
            <div className="authInput-error">{props.error}</div>
        </div>
    )
}

export default AuthInput