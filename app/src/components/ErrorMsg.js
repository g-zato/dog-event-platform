import React from 'react'
import '../App.css'

export default function EmptyMsg(props) {
    return (
        <div className="align-mid">
            <h1>{props.emoji}</h1>
            <h2>{props.txt}</h2>
        </div>
    )
}
