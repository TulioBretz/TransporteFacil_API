const express = require('express');
const routes = express.Router();

let UsuarioModel = require('../model/Cadastro/Usuario');
let VeiculoModel = require('../model/Cadastro/Veiculo');
let MuralMotoristasModel = require('../model/MuralMotoristas');


// Obtém detalhes de um motorista
routes.route('/motorista/:codigoMotorista').get((req, res, next) => {
    UsuarioModel.find({ codigoMotorista: req.params.codigoMotorista }, (error, dataMotorista) => {
        if (error) {
            return next(error)
        } else {
            if (dataMotorista.length > 0) {
                VeiculoModel.find({ usuarioId: dataMotorista[0].id }, (error, dataVeiculo) => {
                    if (error) {
                        return next(error)
                    } else {
                        const resposta = { "DadosMotorista": dataMotorista, "DadosVeiculo": dataVeiculo };
                        res.json(resposta)
                    }
                })
            }
        }
    })
});

routes.route('/muralmotoristas').get((req, res, next) => {
    MuralMotoristasModel.find({}
     ,(error, data) => {
         if (error) {
             return next(error)
         } else {
             res.json(data)
         }
     })
 });

 routes.route('/muralmotorista').post((req, res, next) => {
    MuralMotoristasModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = routes;
