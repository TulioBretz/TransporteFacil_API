const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Chat = new Schema({
    remetenteId: {
        type: String
    },
    destinatarioId: {
        type: String
    },
    mensagem: {
        type: String
    },
    dataEnvio: {
        type: String
    },
    horaEnvio: {
        type: String
    }
}, {
    collection: 'chat'
});

module.exports = mongoose.model('Chat', Chat);
