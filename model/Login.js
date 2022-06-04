const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Login = new Schema({
  login: {
    type: String
  },
  senha: {
    type: String
  },
}, {
  collection: 'cadastro'
});

module.exports = mongoose.model('Login', Login)
