const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Agendamento = new Schema({
    data: {
        type: String
    },
    hora: {
        type: String
    },
    descricao: {
        type: String
    },
    codigocondominio: {
        type: String
    }
}, {
    collection: 'agendamentos'
});

module.exports = mongoose.model('Agendamentos', Agendamento);
