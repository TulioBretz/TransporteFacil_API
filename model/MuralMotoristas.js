const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MuralMotoristas = new Schema({
    locaisAtendimento: {
        type: String
    },
    motoristaId: {
        type: String
    },
    motoristaNome: {
        type: String
    },
    motoristaTelefone: {
        type: String
    },
    motoristaEmail: {
        type: String
    },
    motoristaTipoVeiculo: {
        type: String
    }
}, {
    collection: 'Mural_Motoristas'
});

module.exports = mongoose.model('MuralMotoristas', MuralMotoristas);