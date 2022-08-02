const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GrupoResposta = new Schema({
    id: {
        type: String
    },
    codigoMotorista: {
        type: String
    },
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    horarioDe: {
        type: String
    },
    horarioAte: {
        type: String
    },
}, {
    collection: 'grupos'
});

module.exports = mongoose.model('GrupoResposta', GrupoResposta);