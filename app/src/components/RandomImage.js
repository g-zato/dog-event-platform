import '../App.css'
import React from 'react'
import { CircularProgress, Button } from '@material-ui/core'
import { Cached } from '@material-ui/icons'

export default function RandomImage(props) {

    if (props.image === null) {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }
    else {
        return (
            <div className="image-container">
                <div className="dog-image" style={{ backgroundImage: "url(" + props.image + ")" }} />
                <Button onClick={props.reload} startIcon={<Cached />} style={{ color: '#1d5a94' }} color="primary" variant="outlined">
                    Fetch!
                </Button>
            </div>
        )
    }

}
