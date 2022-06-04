const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Moradores = new Schema({
    _id: {
        type: String
    },
    nome: {
        type: String
    },
    apto: {
        type: String
    },
    bloco: {
        type: String
    },
    email: {
        type: String
    }
},
    {
        collection: 'cadastro'
    });

module.exports = mongoose.model('Moradores', Moradores);
