const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// User Model
let userSchema = require('../models/User');

// CREATE User
router.route('/create-user').post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});

router.route('/get-user/:uName/:pwd').get((req,res) => {
    userSchema.find({"uName":req.params.uName,"pwd":req.params.pwd}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/get-user/:uName').get((req,res) => {
    userSchema.find({"uName":req.params.uName}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/get-user-by-id/:id').get((req,res) => {
    userSchema.find({"_id":req.params.id}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

module.exports = router;