const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Veiculos = new Schema({
    placa: {
        type: String
    },
    cor: {
        type: String
    },
    usuarioId: {
        type: String
    },
    tipoVeiculo: {
        type: String
    }
}, {
    collection: 'Veiculos'
});

module.exports = mongoose.model('Veiculos', Veiculos);