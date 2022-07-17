const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Usuario = new Schema({
    id: {
        type: String
    },
    nome: {
        type: String
    },
    cpf: {
        type: String
    },
    email: {
        type: String
    },
    telefone: {
        type: String
    },
    cep: {
        type: String
    },
    rua: {
        type: String
    },
    bairro: {
        type: String
    },
    cidade: {
        type: String
    },
    numero: {
        type: Number
    },
    apto: {
        type: Number
    },
    bloco: {
        type: Number
    },
    uf: {
        type: String
    },
    senha: {
        type: String
    },
    codigoMotorista: {
        type: String
    },
    codigoEscolar: {
        type: String
    },
},
{
    collection: 'usuario'
});

module.exports = mongoose.model('Usuario', Usuario);