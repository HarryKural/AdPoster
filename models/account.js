/**
 * Created by Harshit Sharma on 2/8/2017.
 */
let mongoose = require('mongoose');

// model is for managing user accounts
let plm = require('passport-local-mongoose');
let findOrCreate = require('mongoose-findorcreate');

// create the schema:  username and password are automatically included
let accountSchema = new mongoose.Schema({});

// enable plm on this model
accountSchema.plugin(plm);
accountSchema.plugin(findOrCreate);

// make the model public
module.exports = mongoose.model('Account', accountSchema);