const Store = require('../models/store');

const newStore = async(req, res, next)=>{
    const { storeid, storename, ownerid, location } = req.body;
    const newstore = new Store({
            storeid, storename, ownerid, location
        });
    let result = '';
    try{
        result = await newstore.save();
    }
    catch(error){
        console.log('Unable to save newstore - ',error);
        return res.json({message: 'Something went wrong! Could not create new store, Please try again.'});
    }
    res.json({result : result.toObject({ getters: true })});
}

const getStores = async(req, res, next)=>{
    let allStores = '';
    try {
      allStores = await Store.find().exec();
    } catch(error){
        console.log('Error log - ',error);
        return res.json({message : 'Something went wrong! Could not retrieve stores information'})
    }
    res.json({allStores : allStores.map( store =>
        store.toObject({ getters: true })
      )});
}
exports.newStore = newStore;
exports.getStores = getStores;