const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    criador: {
        type: String,
        required: true
    },
    data: {
        type: String
    },
    horario: {
        type: String
    },
    descricao: {
        type: String
    },
    foto: {
        type: String
    }
}, {versionKey: false})

module.exports = mongoose.model('event', eventSchema)