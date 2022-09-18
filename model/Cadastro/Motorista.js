const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Motoristas = new Schema({
    codigo: {
        type: String
    }
}, {
    collection: 'Motoristas'
});

module.exports = mongoose.model('Motoristas', Motoristas);