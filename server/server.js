require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

const userSchema = require('./schema/userSchema')
const eventSchema = require('./schema/eventSchema')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//DATABASE
async function connectToDB() {
    mongoose.connect(process.env.DB_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then((result) => console.log('Conexão feita com sucesso!'))
    .then(res => app.listen(port, () => { console.log(`API listening on port ${port}`) }))
    .catch(err => console.log(err))
}
connectToDB()

//GET ROUTES
app.get('/eventos', async (req, res, next) => {
  var eventData = await eventSchema.find({}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  .then((resp) => res.json({success: true, data: resp}))
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
})

app.get('/minhas-inscricoes', async (req, res, next) => {
  var user = await userSchema.findOne({}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  var eventosComprados = await eventSchema.find({ '_id': { $in: user.eventosComprados } }, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥') }
    else { return data }
  })
  .then(resp => { res.json({success: true, data: resp}) })
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
})

app.get('/eventos-salvos', async (req, res, next) => {
  var user = await userSchema.findOne({}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  var eventosSalvos = await eventSchema.find({ '_id': { $in: user.eventosSalvos } }, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥') }
    else { return data }
  })
  .then(resp => {
    res.json({success: true, data: resp})
  })
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
})

app.get('/reset-data', async (req, res, next) => {
  var user = await userSchema.findOneAndUpdate({nome: 'MB Labs'}, {eventosSalvos:[], eventosComprados: []}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  .then(resp => { res.json({success: true, data: resp}) })
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
})

//POST ROUTES
app.post('/inscricao-nova', async (req, res, next) => {
  await userSchema.findOneAndUpdate({nome: 'MB Labs'}, {$addToSet: { eventosComprados: req.body.id }}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  .then((resp) => res.json({success: true, data: resp}))
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
} )

app.post('/checar-inscricao', async (req, res, next) => {
  await userSchema.findOne({eventosComprados: req.body.id }, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else if(data) { res.json({success: true, found: true}) }
    else if(!err && !data) { res.json({success: true, found: false}) }
  })
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
} )

app.post('/salvar-evento', async (req, res, next) => {
  await userSchema.findOneAndUpdate({nome: 'MB Labs'}, {$addToSet: { eventosSalvos: req.body.id }}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  .then((resp) => res.json({success: true, data: resp}))
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
} )

app.post('/dessalvar-evento', async (req, res, next) => {
  await userSchema.findOneAndUpdate({nome: 'MB Labs'}, {$pull: { eventosSalvos: req.body.id }}, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else { return data }
  })
  .then((resp) => res.json({success: true, data: resp}))
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
} )

app.post('/checar-salvo', async (req, res, next) => {
  await userSchema.findOne({eventosSalvos: req.body.id }, (err, data) => {
    if(err) { console.log('ERRO AO LER DB 💥')}
    else if(data) { res.json({success: true, found: true}) }
    else if(!err && !data) { res.json({success: true, found: false}) }
  })
  .catch(err => {
    res.json({success: false, data: err})
    console.log(err)
  })
} )

app.post('/criar-evento', async (req, res, next) => {
  try {
    const newEvent = new eventSchema({
        criador: req.body.criador,
        nome: req.body.nome,
        data: req.body.data,
        horario: req.body.horario,
        descricao: req.body.descricao,
        foto: req.body.foto
    })

    newEvent.save()
    .then(() => res.json({success: true}))
    .catch(err => console.log(err))
  }
  catch(err) { console.log(err) }
})