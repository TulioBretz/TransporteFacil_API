const express = require('express');
const gastosRoute = express.Router();

let GastosModel = require('../model/gastos/Gastos');

gastosRoute.route('/inserir').post((req, res, next) => {
    GastosModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

gastosRoute.route('/:codcondominio').get((req, res, next) => {
    GastosModel.find({ codigocondominio: req.params.codcondominio }
     ,(error, data) => {
         if (error) {
             return next(error)
         } else {
             res.json(data)
         }
     })
 });

 gastosRoute.route('/:id').delete((req, res, next) => {
    GastosModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = gastosRoute;