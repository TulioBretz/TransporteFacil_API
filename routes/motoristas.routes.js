const express = require('express');
const routes = express.Router();

let MoradoresModel = require('../model/usuarios/Moradores');
let NotificacaoModel = require('../model/usuarios/Notificar');
let UsuarioModel = require('../model/Cadastro/Usuario');
let VeiculoModel = require('../model/Cadastro/Veiculo');
let LoginModel = require('../model/Login');
let MuralMotoristasModel = require('../model/MuralMotoristas');

// Obtém a lista de motoristas
// usuariosRoutes.route('/motoristas').get((req, res, next) => {
//     MoradoresModel.find({ $and: [{codigocondominio: req.params.codigo}, {cep: req.params.cep}, {cpf: { $ne: req.params.usuariocpf}}]}, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// });

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

routes.route('/mural').get((req, res, next) => {
    MuralMotoristasModel.find({}
     ,(error, data) => {
         if (error) {
             return next(error)
         } else {
             res.json(data)
         }
     })
 });

module.exports = routes;
