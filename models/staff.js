const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name : { type : String, required : true },
    staffid : { type : String, required : true },
    storeid : { type: mongoose.Types.ObjectId, required: true, ref: 'Store'}
});

module.exports = mongoose.model('Staff', staffSchema);