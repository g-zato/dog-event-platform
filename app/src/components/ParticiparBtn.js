import React from 'react'
import { Button } from '@material-ui/core'
import { Check, Group } from '@material-ui/icons'

export default function ParticiparBtn(props) {

   const handleClick = async  () => {
        await props.participarDoEvento()
        props.setIsAdded(true)
    }

    if(!props.added) {
        return (
            <div>
                <Button onClick={handleClick} color="primary" startIcon={<Group />} style={{color: '#1d5a94'}}>
                    Participar do evento!
                </Button>
            </div>
        )
    }
    else if(props.added) {
        return (
            <div>
                <Button startIcon={<Check />} style={{color: '#2aa58a'}}>
                    Você está inscrito
                </Button>
            </div>
        )
    }
}
