const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    category: {
        type: String
    }
}, {
    collection: 'categories'
});

module.exports = mongoose.model('Category', categorySchema);