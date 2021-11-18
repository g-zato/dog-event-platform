import React, { useState, useEffect } from 'react'
import { Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core'

import ParticiparBtn from './ParticiparBtn'
import SalvarBtn from './SalvarBtn'

export default function EventCard(props) {

  const [gotResponse, setGotResponse] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(async () => {
    checarInscricao()
    checarSalvo()
  }, [])

  async function participarDoEvento() {
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id })
    }
    await fetch('http://localhost:5000/inscricao-nova', options)
      .then(async res => {
        const resp = await res.json()
        if (resp.success) {
          setGotResponse(true)
          alert('Você se inscreveu com sucesso!')
        }
        else if (!resp.success) {
          setGotResponse(false)
          alert('Houve um erro ao tentar se inscrever no evento... 🤔')
        }
      })
      .catch(err => {
        setGotResponse(false)
        alert('Estamos tendo problema para se conectar aos nossos servidores')
      })
  }

  async function checarInscricao() {
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id })
    }
    await fetch('http://localhost:5000/checar-inscricao', options)
      .then(async res => {
        const resp = await res.json()
        if (resp.success && resp.found) {
          setIsAdded(true)
        }
        else if (!resp.success) {
          setGotResponse(false)
          alert('Houve um erro ao tentar se inscrever no evento... 🤔')
        }
      })
      .catch(err => {
        setGotResponse(false)
        console.log('Estamos tendo problema para se conectar aos nossos servidores')
      })
  }

  async function salvarEvento() {
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id })
    }
    await fetch('http://localhost:5000/salvar-evento', options)
      .then(async res => {
        const resp = await res.json()
        console.log(resp)
        if (resp.success) {
          alert('Evento salvo na sua lista!')
        }
        else if (!resp.success) {
          alert('Houve um erro ao tentar se inscrever no evento... 🤔')
        }
      })
      .catch(err => {
        setGotResponse(false)
        alert('Estamos tendo problema para se conectar aos nossos servidores')
      })
  }

  async function dessalvarEvento() {
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id })
    }
    await fetch('http://localhost:5000/dessalvar-evento', options)
      .then(async res => {
        const resp = await res.json()
        console.log(resp)
        if (resp.success) {
          alert('Evento tirado da sua lista!')
        }
        else if (!resp.success) {
          alert('Houve um erro ao tentar se inscrever no evento... 🤔')
        }
      })
      .catch(err => {
        setGotResponse(false)
        alert('Estamos tendo problema para se conectar aos nossos servidores')
      })
  }

  async function checarSalvo() {
    var options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id })
    }
    await fetch('http://localhost:5000/checar-salvo', options)
      .then(async res => {
        const resp = await res.json()
        console.log(resp)
        if (resp.success && resp.found) {
          setIsSaved(true)
        }
        else if (!resp.success) {
          alert('Houve um erro ao tentar se inscrever no evento... 🤔')
        }
      })
      .catch(err => {
        console.log('Estamos tendo problema para se conectar aos nossos servidores')
      })
  }
  return (
    <div>
      <Card className="evento">
        <CardMedia
          component="img"
          height="300"
          image={props.foto}
          alt="Random dog image"
        />
        <CardHeader
          avatar={
            <Avatar aria-label="User" className="profile" />
          }
          title={props.criador}
        />
        <CardContent className="card-content">
          <div className="evento-info">
            <h2>{props.nome}</h2>
            <div>
              <h2 className="evento-data">{props.data}</h2>
              <p className="evento-horario">{props.horario}</p>
            </div>
          </div>
          <Typography component="p" variant="body2" color="textSecondary">
            {props.descricao}
          </Typography>
        </CardContent>
        <CardActions>
          <SalvarBtn
            salvarEvento={salvarEvento}
            dessalvarEvento={dessalvarEvento}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
          />
          <ParticiparBtn
            participarDoEvento={participarDoEvento}
            added={isAdded}
            setIsAdded={setIsAdded}
          />
        </CardActions>
      </Card>
    </div>
  )
}