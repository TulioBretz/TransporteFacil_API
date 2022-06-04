const express = require('express');
const app = express();
const routes = express.Router();

let MotoristaModel = require('../model/Cadastro/Motorista');
let UsuarioModel = require('../model/Cadastro/Usuario');
let VeiculoModel = require('../model/Cadastro/Veiculo');


// Login
routes.route('/login/:cpf/:senha').get((req, res, next) => {
    UsuarioModel.find({ cpf: req.params.cpf, senha: req.params.senha }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Verifica o código fornecido pelo aluno e ingressa em um escolar
routes.route('/ingressar/:codigoMotorista/:alunoId').get((req, res, next) => {
    UsuarioModel.find({ codigoMotorista: req.params.codigoMotorista }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data[0]) {  // Caso o código fornecido seja válido

                const filter = { id: req.params.alunoId };
                const update = { codigoEscolar: req.params.codigoMotorista };
                
                UsuarioModel.updateOne(filter, update, (error, data) => {
                    if (error) {
                        return next(error);
                    }
                })
            }
            res.json(data)
        }
    })
});

// Cadastrar usuário motorista
routes.route('/motorista').post((req, res, next) => {
    console.log(req.body);
    UsuarioModel.create(req.body.dadosUsuario, (error, data) => {
        if (error) {
            return next(error)
        } else {
            MotoristaModel.create(req.body.dadosMotorista, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    VeiculoModel.create(req.body.dadosMotorista.dadosVeiculo, (error, data) => {
                        if (error) {
                            return next(error)
                        } else {
                            res.json(data)
                        }
                    })
                }
            })
        }
    })
});

// Cadastrar usuário aluno
routes.route('/aluno').post((req, res, next) => {
    console.log(req.body);
    UsuarioModel.create(req.body.dadosUsuario, (error, data) => {
        if (error) {
            return next(error)
        } else {
            AlunoModel.create(req.body.dadosMotorista, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    InstituicaoModel.create(req.body.dadosMotorista.dadosVeiculo, (error, data) => {
                        if (error) {
                            return next(error)
                        } else {
                            res.json(data)
                        }
                    })
                }
            })
        }
    })
});

module.exports = routes;