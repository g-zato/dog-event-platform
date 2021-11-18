import { Bookmark } from '@material-ui/icons'
import React from 'react'
import { IconButton, Button } from '@material-ui/core'

export default function SalvarBtn(props) {

   const handleClick = async  () => {
       if(!props.isSaved) {
            props.salvarEvento()
            props.setIsSaved(true)
       }
       else if(props.isSaved) {
        props.dessalvarEvento()
        props.setIsSaved(false)
       }
    }

    if(!props.isSaved) {
        return (
            <div>
                <IconButton onClick={handleClick}>
                    <Bookmark/>
                </IconButton>
            </div>
        )
    }
    else if(props.isSaved) {
        return (
            <div>
                <Button onClick={handleClick} style={{backgroundColor: '#1d5a94', marginLeft: '15px', color: '#fff'}} startIcon={<Bookmark />}>
                    Salvo
                </Button>
            </div>
        )
    }
}
