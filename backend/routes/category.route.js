const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

let categorySchema = require('../models/Category');

router.route('/create-category').post((req, res, next) => {
    categorySchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    categorySchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;