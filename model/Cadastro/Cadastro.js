const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cadastro = new Schema({
    teste: {
        type: String
    }
}, {
    collection: 'cadastro'
});

module.exports = mongoose.model('Cadastro', Cadastro);
