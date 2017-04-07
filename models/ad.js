/**
 * Created by Harshit Sharma on 07-Apr-2017.
 */
// reference mongoose
let mongoose = require('mongoose');

// create ad schema
let adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    price: {
        type: Number,
        min: 0.01
    }
});

// make it public
module.exports = mongoose.model('Ad', adSchema);
