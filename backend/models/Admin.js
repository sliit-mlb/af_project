const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    uName: {
        type: String
    },
    pwd: {
        type: String
    }
}, {
    collection: 'admin'
});

module.exports = mongoose.model('Admin', adminSchema);