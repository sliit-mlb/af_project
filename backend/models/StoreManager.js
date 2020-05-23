const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let managerSchema = new Schema({
    name: {
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
    }
}, {
    collection: 'storeManagers'
});

module.exports = mongoose.model('StoreManagers', managerSchema);