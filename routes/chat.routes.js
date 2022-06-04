const express = require('express');
const chatRoute = express.Router();

let ChatModel = require('../model/chat/Chat');

chatRoute.route('/enviarMensagem').post((req, res, next) => {
    ChatModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

chatRoute.route('/mensagens/:usuarioId/:destinatarioId').get((req, res, next) => {
   ChatModel.find({ $or: [ { $and: [{ remetenteId: req.params.usuarioId }, { destinatarioId: req.params.destinatarioId }] }, 
    { $and: [{ remetenteId: req.params.destinatarioId }, { destinatarioId: req.params.usuarioId }] }]}
    ,(error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = chatRoute;