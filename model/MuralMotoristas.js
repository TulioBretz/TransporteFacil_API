const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MuralMotoristas = new Schema({
    nomeMotorista: {
        type: String
    },
    descricao: {
        type: String
    },
    locais: {
        type: String
    },
    locais: {
        type: String
    }
}, {
    collection: 'mural-motoristas'
});

module.exports = mongoose.model('MuralMotoristas', MuralMotoristas);
