import React, { useState, useEffect } from 'react'
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import ErrorMsg from '../components/ErrorMsg';
import { CircularProgress, Paper } from '@material-ui/core';
import '../App.css'
export default function Eventos(props) {

  const [events, setEvents] = useState(null)
  const [filter, setFilter] = useState(null)
  const [gotResponse, setGotResponse] = useState(null)

  useEffect(async () => {  //fetch events
    props.setActivePage({
      eventos: 'selected',
      inscricoes: '',
      salvos: '',
      criar: ''
    })
    await fetch('http://localhost:5000/eventos')
      .then(async res => {
        const resp = await res.json()
        setEvents(resp.data)
        setGotResponse(true)
        console.log(resp.data[0]._id)
        return resp
      })
      .catch(err => {
        setGotResponse(false)
        console.log(err)
      })
  }, [])

  if (events == null && gotResponse == null) {
    return (
      <>
        <div className="align-mid">
          <Paper style={{ padding: '30px' }}>
            <CircularProgress />
          </Paper>
        </div>
      </>
    )
  }
  else if (events == null && gotResponse == false) {
    return (
      <>
        <ErrorMsg emoji="😅" txt="Tivemos problemas para se conectar com o servidor" />
      </>
    )
  }
  else if (events) {
    return (
      <>
        <SearchBar updateFilter={setFilter} />
        <div className="event-container">
          {Object.keys(events)
            .filter((id) => {
              if (filter == null) { return id }
              else if (filter != null && events[id].nome.toLowerCase().includes(filter.toLowerCase())) { return events[id] }
              else if (filter != null && events[id].descricao.toLowerCase().includes(filter.toLowerCase())) { return events[id] }
              else if (filter != null && events[id].data.toLowerCase().includes(filter.toLowerCase())) { return events[id] }
              else if (filter != null && events[id].horario.toLowerCase().includes(filter.toLowerCase())) { return events[id] }
            })
            .map((id) => {
              return (
                <>
                  <EventCard
                    id={events[id]._id}
                    criador={events[id].criador}
                    nome={events[id].nome}
                    data={events[id].data}
                    horario={events[id].horario}
                    descricao={events[id].descricao}
                    foto={events[id].foto}
                  />
                </>
              )
            })}
        </div>
      </>
    )
  }

}
