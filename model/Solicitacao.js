const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Solicitacao = new Schema({
    texto: {
        type: String
    },
    autor: {
        type: String
    },
    privada: {
        type: Boolean
    },
    data: {
        type: String
    },
    usuarioid: {
        type: String
    },
    codigocondominio: {
        type: String
    }
}, {
    collection: 'solicitacao'
});

module.exports = mongoose.model('Solicitacao', Solicitacao);
