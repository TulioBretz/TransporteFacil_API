const express = require('express');
const usuariosRoutes = express.Router();

let MoradoresModel = require('../model/usuarios/Moradores');
let NotificacaoModel = require('../model/usuarios/Notificar');

let LoginModel = require('../model/Login');

// Obtém a lista de motoristas
usuariosRoutes.route('/motoristas').get((req, res, next) => {
    MoradoresModel.find({ $and: [{codigocondominio: req.params.codigo}, {cep: req.params.cep}, {cpf: { $ne: req.params.usuariocpf}}]}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});



// Notificar um morador
usuariosRoutes.route('/moradores/notificar').post((req, res, next) => {
    NotificacaoModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {this.search
            res.json(data)
        }
    })
});

module.exports = usuariosRoutes;
