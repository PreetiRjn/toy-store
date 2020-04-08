const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    category : { type : String, required : true },
    name : { type : String, required : true },
    price : { type : Number, required : true },
    currency : { type : String, required : true },
    storeid : { type : String, required : true }
});

module.exports = mongoose.model('Toy', toySchema);