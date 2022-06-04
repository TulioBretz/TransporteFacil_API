const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Notificacao = new Schema({
    moradorid: {
        type: String
    },
    motivo: {
        type: String
    },
    mensagem: {
        type: String
    },
    data: {
        type: Date
    }
}, {
    collection: 'notificacoes'
});

module.exports = mongoose.model('Notificacao', Notificacao);
