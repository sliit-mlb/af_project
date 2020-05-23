const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let managerSchema = require('../models/StoreManager');

router.route('/create-store-manager').post((req, res, next) => {
    managerSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});

router.route('/get-store-manager/:uName/:pwd').get((req,res) => {
    managerSchema.find({"uName":req.params.uName,"pwd":req.params.pwd},(error,data)=>{
        if(error)
            return next(error);
        else
            res.json(data);
    })
})

router.route('/').get((req, res) => {
    managerSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/delete-store-manager/:id').delete((req, res, next) => {
    managerSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;