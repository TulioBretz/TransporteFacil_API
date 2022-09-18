const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Instituicao = new Schema({
    alunoId: {
        type: String
    },
    instituicaoNome: {
        type: String
    },
    turno: {
        type: String
    },
    horarioDe: {
        type: String
    },
    horarioAte: {
        type: String
    }
}, {
    collection: 'Instituicoes'
});

module.exports = mongoose.model('Instituicao', Instituicao);