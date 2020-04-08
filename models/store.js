const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeid : { type : String, required : true },
    storename : { type : String, required : true },
    staffs : [{ type: mongoose.Types.ObjectId, ref: 'Staff' }] ,
    location : { type : String, required : true }
});

module.exports = mongoose.model('Store', storeSchema);