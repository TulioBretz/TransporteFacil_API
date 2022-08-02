const express = require('express');
const app = express();
const routes = express.Router();

let GrupoModel = require('../model/Grupos/Grupo');

// Obtém a lista de grupos do motorista
routes.route('/grupos/:codigomotorista').get((req, res, next) => {
    GrupoModel.find({ codigoMotorista: req.params.codigomotorista }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Cria um novo grupo
routes.route('/grupo').post((req, res, next) => {
    GrupoModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = routes;