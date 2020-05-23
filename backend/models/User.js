const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    uName: {
        type: String
    },
    email: {
        type: String
    },
    pwd: {
        type: String
    },
    wishList: {
        type: []
    },
    shoppingCart: {
        type: []
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);