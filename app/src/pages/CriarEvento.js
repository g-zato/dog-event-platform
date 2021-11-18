import React, { useState, useEffect } from 'react'

import { Paper, TextField, Button } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import RandomImage from '../components/RandomImage'
import ErrorMsg from '../components/ErrorMsg'
import '../App.css'
import { useHistory } from 'react-router-dom'


export default function CriarEvento(props) {

    useEffect(async () => {
        props.setActivePage({
            eventos: '',
            inscricoes: '',
            salvos: '',
            criar: 'selected'
        })
        await fetchImage()
    }, [])
    const criador = 'MB Labs'
    const history = useHistory()
    const [gotResponse, setGotResponse] = useState(null)
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        nome: null,
        data: null,
        horario: null,
        descricao: null,
        foto: image,
        criador: criador
    })
    
    async function fetchImage() {
        setImage(null)
        await fetch('https://dog.ceo/api/breeds/image/random')
            .then(async res => {
                const resp = await res.json()
                setImage(resp.message)
                setFormData({
                    nome: formData.nome,
                    data: formData.data,
                    horario: formData.horario,
                    descricao: formData.descricao,
                    foto: resp.message,
                    criador: criador
                })
            })
    }

    async function createEvent() {
        var options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }
        console.log(formData)
        await fetch('http://localhost:5000/criar-evento', options)
            .then(async res => {
                const resp = await res.json()
                if (resp.success) {
                    setGotResponse(true)
                    alert('Evento criado com sucesso!')
                    history.go(0)
                }
                else if (!resp.success) {
                    setGotResponse(false)
                    alert('Houve um erro ao criar o seu evento... 🤔')
                }
            })
            .catch(err => {
                console.log(err)
                setGotResponse(false)
                alert('Estamos tendo problema para se conectar aos nossos servidores')
            })
    }

    function handleNameInputChange(event) {
        setFormData({
            nome: event.target.value,
            data: formData.data,
            horario: formData.horario,
            descricao: formData.descricao,
            foto: formData.foto,
            criador: criador
        })
    }
    function handleDataInputChange(event) {
        setFormData({
            nome: formData.nome,
            data: event.target.value,
            horario: formData.horario,
            descricao: formData.descricao,
            foto: formData.foto,
            criador: criador
        })
    }
    function handleHorarioInputChange(event) {
        setFormData({
            nome: formData.nome,
            data: formData.data,
            horario: event.target.value,
            descricao: formData.descricao,
            foto: formData.foto,
            criador: criador
        })
    }
    function handleDescricaoInputChange(event) {
        setFormData({
            nome: formData.nome,
            data: formData.data,
            horario: formData.horario,
            descricao: event.target.value,
            foto: formData.foto,
            criador: criador
        })
    }
    return (
        <div>
            <Paper className="panel">
                <h1>Insira os dados do seu evento!</h1>
                <TextField onChange={handleNameInputChange} className="margin-bottom" label="Nome do evento" variant="outlined" ></TextField>
                <TextField onChange={handleDataInputChange} className="margin-bottom" label="Data" variant="outlined" ></TextField>
                <TextField onChange={handleHorarioInputChange} className="margin-bottom" label="Horário" variant="outlined" ></TextField>
                <TextField onChange={handleDescricaoInputChange} label="Descrição" variant="outlined"></TextField>
                <h3>Foto:</h3>
                <RandomImage image={image} reload={fetchImage} />

                <Button onClick={createEvent} startIcon={<AddBox />} color="primary" variant="contained" style={{ backgroundColor: '#1d5a94' }}>
                    Criar evento!
                </Button>

            </Paper>
        </div>
    )
}

