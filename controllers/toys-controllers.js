const Toy = require('../models/toy');
const HttpError = require('../models/http-error');

const newToy = async (req, res, next) => {
    const { category, name, price, storeid, currency, quantity } = req.body;
    const newtoy = new Toy({
        category, name, price, storeid, currency, quantity
    });
    let result = '';
    try {
        result = await newtoy.save();
    }
    catch (error) {
        console.log('Unable to save newtoy - ', error);
        return res.json({ message: 'Something went wrong! Could not create new toy, Please try again.' });
    }
    res.json({ result: result.toObject({ getters: true }) });
}

const getToys = async (req, res, next) => {
    let allToys = '';
    try {
        allToys = await Toy.find().exec();
    } catch (error) {
        console.log('Error log - ', error);
        return res.json({ message: 'Something went wrong! Could not retrieve toys information' })
    }
    res.json({
        allToys: allToys.map(toy =>
            toy.toObject({ getters: true })
        )
    });
}

const getToysByCategory = async (req, res, next) => {
    let toy = '';
    try {
        console.log(req.body.category);
        toy = await Toy.findById(req.body.category);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong! Could not fetch data',
            500
        );
        return next(error);
    }
    if (!toy || toy.length === 0) {
        return next(
            new HttpError('Could not find toys in the provided category.', 404)
        );
    }
    res.json({toy})
}

const updateToy = async (req, res, next) => {
  
    const { category, name, price, currency, quantity, storeid } = req.body;
    const toyId = req.params.id;
  
    let toy;
    try {
      toy = await Toy.findById(toyId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update toy.',
        500
      );
      return next(error);
    }
    console.log(toy);
    if(!toy){
        const error = new HttpError('Could not find toy with Id',404);
        return next(error)
    }
    toy.category = category;
    toy.name = name;
    toy.price = price;
    toy.currency = currency;
    toy.quantity = quantity;
    toy.storeid = storeid;
    try {
      await toy.save();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update toy.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ toy: toy.toObject({ getters: true }) });
  };

  const deleteToy = async (req, res, next) => {
    const toyId = req.params.id;
  
    let toy;
    try {
      toy = await Toy.findById(toyId).populate('creator');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete toy.',
        500
      );
      return next(error);
    }
  
    if (!toy) {
      const error = new HttpError('Could not find toy for this id.', 404);
      return next(error);
    }
  
    try {
      await toy.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete place.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Deleted toy.' });
  };

exports.newToy = newToy;
exports.getToys = getToys;
exports.getToysByCategory = getToysByCategory;
exports.updateToy = updateToy;
exports.deleteToy = deleteToy;