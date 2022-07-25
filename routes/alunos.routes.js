const express = require('express');
const routes = express.Router();

let MoradoresModel = require('../model/usuarios/Moradores');
let NotificacaoModel = require('../model/usuarios/Notificar');
let UsuarioModel = require('../model/Cadastro/Usuario');
let VeiculoModel = require('../model/Cadastro/Veiculo');
let LoginModel = require('../model/Login');

// Obtém a lista de alunos ingressados no escolar
routes.route('/ingressados/:codigoEscolar').get((req, res, next) => {
    UsuarioModel.find({ codigoEscolar: req.params.codigoEscolar }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Desvincula o aluno do escolar
routes.route('/desvincular').put((req, res, next) => {

    const filter = { id: req.body.id };
    const update = { codigoEscolar: null };

    console.log(req.body);
    
    UsuarioModel.updateOne(filter, update, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});


module.exports = routes;
