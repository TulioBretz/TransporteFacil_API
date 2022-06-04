const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CadastroResposta = new Schema({
    nome: {
        type: String
    },
    sobrenome: {
        type: String
    },
    transportefacilo: {
        type: Boolean
    }
}, {
    collection: 'cadastro'
});

module.exports = mongoose.model('CadastroResposta', CadastroResposta);
