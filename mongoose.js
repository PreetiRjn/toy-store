const mongoose = require('mongoose');

const Toy = require('./models/toy');
const url = 'mongodb+srv://preeti:mydatabase@cluster0-pojb7.mongodb.net/toystore?retryWrites=true&w=majority';

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>{
            console.log('Connected to Database');
        })
        .catch((error)=>{
            console.log('Connection to database failed -- ',error);
        });
const newToy = async(req, res, next)=>{
    const { category, name, price, storeid, currency} = req.body;
    const newtoy = new Toy({
            category, name, price, storeid, currency
        });
    let result = '';
    try{
        result = await newtoy.save();
    }
    catch(error){
        console.log('Unable to save newtoy - ',error);
        return res.json({message: 'Something went wrong! Could not create new toy, Please try again.'});
    }
    res.json(result);
}

const getToys = async(req, res, next)=>{
    let allToys = '';
    try {
      allToys = await Toy.find().exec();
    } catch(error){
        console.log('Error log - ',error);
        return res.json({message : 'Something went wrong! Could not retrieve toys information'})
    }
    res.json(allToys);
}
exports.newToy = newToy;
exports.getToys = getToys;