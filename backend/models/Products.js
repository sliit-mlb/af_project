const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    rate: {
        type: []
    },
    inStock: {
        type: Number
    },
    category: {
        type: String
    },
    discount:{
        type: Number
    },
    comments:{
        type: []
    },
    imgName: {
        type: String
    }
},{
    collection:"products"
})

module.exports = mongoose.model('Products',productSchema);