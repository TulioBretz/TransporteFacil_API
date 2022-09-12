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
    UsuarioModel.create(req.body.dadosUsuario, (error, dataUsuario) => {
        if (error) {
            return next(error)
        } else {
            MotoristaModel.create(req.body.dadosMotorista, (error, dataMotorista) => {
                if (error) {
                    return next(error)
                } else {
                    VeiculoModel.create(req.body.dadosMotorista.dadosVeiculo, (error, dataVeiculo) => {
                        if (error) {
                            return next(error)
                        }
                    })
                }
            })
        }
    })
});

// Cadastrar usuário aluno
routes.route('/aluno').post((req, res, next) => {
    UsuarioModel.create(req.body.dadosUsuario, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Alterar dados pessoais usuário
routes.route('/alterardados').put((req, res, next) => {

    const filter = { id: req.body.id };

    UsuarioModel.updateOne(filter, req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});

// Alterar dados de endereço do usuário
routes.route('/alterarendereco').put((req, res, next) => {

    const filter = { id: req.body.id };

    UsuarioModel.updateOne(filter, req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});

// Alterar dados de senha do usuário
routes.route('/alterarsenha').put((req, res, next) => {

    const filter = { id: req.body.id };

    UsuarioModel.updateOne(filter, req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
});

module.exports = routes;