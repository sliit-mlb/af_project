const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let adminSchema = require('../models/Admin');

router.route('/create-admin').post((req, res, next) => {
    adminSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});

router.route('/get-admin/:uName/:pwd').get((req,res) => {
    adminSchema.find({"uName":req.params.uName,"pwd":req.params.pwd}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/').get((req,res) => {
    adminSchema.find((error,data) => {
        if(error)
            return next(error);
        else
            res.json(data);
    })
})

module.exports = router;