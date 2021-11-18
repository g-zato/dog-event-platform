const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    foto: {
        type: String
    },
    eventosSalvos: {
        type: Array
    },
    eventosComprados: {
        type: Array
    }
})

module.exports = mongoose.model('users', userSchema)