const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Grid = require("gridfs-stream");

let productSchema = require('../models/Products');

router.route('/create-product').post((req,res,next) => {
    productSchema.create(req.body, (error,data) => {
        if(error){
            return next(error);
        }else {
            console.log(data);
            res.json(data);
        }
    })
})

router.route('/').get((req,res) => {
    productSchema.find((error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

router.route('/delete-product/:id').delete((req, res, next) => {
    productSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

router.route('/:category').get((req,res) => {
    productSchema.find({"category":req.params.category},(error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

router.route('/get-unique-product/:id').get((req,res) => {
    productSchema.find({"_id":req.params.id},(error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

router.route('/update-discount/:title/:discount').put((req,res) => {
    productSchema.update({"title":req.params.title},
    {"$set":{"discount":req.params.discount}},(error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

router.route('/add-comment-rating/:id/:comment/:rate/:count').put((req,res,next) => {
    productSchema.update({"_id":req.params.id},{
        "$push":{"comments":{"comment":req.params.comment},"rate":{"currentRate":req.params.rate,"count":req.params.count}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully added to comment and rating");
        }
    })
})

router.route('/delete-previous-rate/:id/:currentRate/:count').put((req,res,next) => {
    productSchema.update({"_id":req.params.id},{
        "$pull":{"rate":{"currentRate":req.params.currentRate,"count":req.params.count}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully deleted");
        }
    })
})

router.route('/edit-discount/:id/:discount').put((req,res) => {
    productSchema.update({"_id":req.params.id},
        {"$set":{"discount":req.params.discount}},(error,data) => {
            if(error){
                return next(error);
            } else{
                res.json(data);
            }
        })
})

router.route('/update-product/:id').put((req, res, next) => {
    productSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Student updated successfully !')
        }
    })
})

module.exports = router;