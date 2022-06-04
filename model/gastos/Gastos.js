const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gastos = new Schema({
    descricao: {
        type: String
    },
    valor: {
        type: String
    },
    data: {
        type: String
    },
    codigocondominio: {
        type: String
    }
}, {
    collection: 'gastos'
});

module.exports = mongoose.model('Gastos', Gastos);
