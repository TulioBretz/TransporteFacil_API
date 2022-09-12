const express = require('express');
const app = express();
const routes = express.Router();

let GrupoModel = require('../model/Grupos/Grupo');
let AlunosGrupoModel = require('../model/Grupos/AlunosGrupo');

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
    console.log(req.body);
    GrupoModel.create(req.body, (error, dataGrupo) => {
        if (error) {
            return next(error)
        } else {
            req.body.alunosGrupo.forEach(element => {
                AlunosGrupoModel.create(element, (error, dataAlunosGrupo) => {
                    if (error) {
                        return next(error)
                    } else {
                        res.json(dataAlunosGrupo)
                    }
                })
            });
        }
    })
});

// Deleta grupo
routes.route('/grupo/:grupoid').delete((req, res, next) => {
    GrupoModel.deleteOne({id: req.params.grupoid }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Obtém a lista de alunos do grupo
routes.route('/alunos/:grupoid').get((req, res, next) => {
    AlunosGrupoModel.find({ grupoId: req.params.grupoid }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Deleta um ou mais alunos do grupo
routes.route('/alunos/:alunoId/:grupoId').delete((req, res, next) => {
    AlunosGrupoModel.deleteOne({alunoId: req.params.alunoId, grupoId: req.params.grupoId }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = routes;