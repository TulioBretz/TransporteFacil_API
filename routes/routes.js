const express = require('express');
const app = express();
const routes = express.Router();

let LoginModel = require('../model/Login');
let CadastroModel = require('../model/Cadastro/Cadastro');
let SolicitacaoModel = require('../model/Solicitacao');
let AgendamentoModel = require('../model/Agendamento');

// Login
routes.route('/login/:login/:senha').get((req, res, next) => {
    CadastroModel.find({ email: req.params.login, senha: req.params.senha }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Obter as informações do Síndico
routes.route('/transportefacilo/:condominioId').get((req, res, next) => {
    CadastroModel.find({ codigocondominio: req.params.condominioId, transportefacilo: true }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Verificar Código de Condomínio
routes.route('/codigocondominio/:codigo/:cep/:numero').get((req, res, next) => {
    CadastroModel.find({
        codigocondominio: req.params.codigo,
        cep: req.params.cep,
        numero: req.params.numero
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Cadastro Usuário
//     Verifica se já existe um usuário com email ou cpf cadastrados
//     Se não existir, cria o novo registro no banco
routes.route('/usuarios/cadastrar').post((req, res, next) => {
    CadastroModel.find({ $or: [{ email: req.body.email }, { cpf: req.body.cpf }] }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data.length) {
                res.json({ msg: 'Usuário com o mesmo email ou CPF já cadastrado!' })
            } else {
                CadastroModel.create(req.body, (error2, data2) => {
                    if (error2) {
                        return next(error2)
                    } else {
                        res.json(data2)
                    }
                })
            }
        }
    });
});

routes.route('/usuarios/atualizar/:id').put((req, res, next) => {
    CadastroModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Usuário atualizado com sucesso!');
        }
    })
});

// Obtém as informações de um determinado usuário
routes.route('/usuarios/:id').get((req, res, next) => {
    CadastroModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

routes.route('/agendamentos/cadastrar').post((req, res, next) => {
    AgendamentoModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

routes.route('/agendamentos/:codcondominio').get((req, res, next) => {
    AgendamentoModel.find({ codigocondominio: req.params.codcondominio }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

routes.route('/solicitacao').post((req, res, next) => {
    SolicitacaoModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

routes.route('/solicitacoes/:codcondominio').get((req, res, next) => {
    SolicitacaoModel.find({ codigocondominio: req.params.codcondominio }, (error, data) => {
        if (error) {
            return next('TESTE DE ERRO')
        } else {
            res.json(data)
        }
    })
});

routes.route('/solicitacoespublicas/:codcondominio/:usuarioid').get((req, res, next) => {
    SolicitacaoModel.find({ $and: [{ codigocondominio: req.params.codcondominio }, { $or: [{ privada: false }, { usuarioid: req.params.usuarioid }] }] }, (error, data) => {
        if (error) {
            return next('TESTE DE ERRO')
        } else {
            res.json(data)
        }
    })
});

routes.route('/solicitacao/:id').delete((req, res, next) => {
    SolicitacaoModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

// Add message
routes.route('/send-message').post((req, res, next) => {
    LoginModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Mensagens teste
routes.route('/mensagens').get((req, res) => {
    LoginModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Add Song
routes.route('/create-song').post((req, res, next) => {
    LoginModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Song com Filter
routes.route('/get-song-filter/:filter').get((req, res, next) => {
    LoginModel.find({ artist: req.params.filter }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Get all songs
routes.route('/').get((req, res) => {
    LoginModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single song
routes.route('/get-song/:id').get((req, res) => {
    LoginModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update song
routes.route('/update-song/:id').put((req, res, next) => {
    LoginModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Song successfully updated!')
        }
    })
})

// Delete song
routes.route('/delete-song/:id').delete((req, res, next) => {
    LoginModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = routes;
