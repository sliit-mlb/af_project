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

router.route('/add-to-shopping-cart/:id/:item').put((req,res,next) => {
    userSchema.update({"_id":req.params.id},{
        "$push":{"shoppingCart":{"item":req.params.item}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully added to shopping cart");
        }
    })
})

router.route('/delete-shopping-cart/:id/:item').put((req,res,next) => {
    userSchema.update({"_id":req.params.id},{
        "$pull":{"shoppingCart":{"item":req.params.item}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully deleted");
        }
    })
})

router.route('/add-to-wishlist/:id/:item').put((req,res,next) => {
    userSchema.update({"_id":req.params.id},{
        "$push":{"wishList":{"item":req.params.item}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully added to wishlist");
        }
    })
})

router.route('/delete-wishlist/:id/:item').put((req,res,next) => {
    userSchema.update({"_id":req.params.id},{
        "$pull":{"wishList":{"item":req.params.item}}
    },(error,data)=> {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Successfully deleted");
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
