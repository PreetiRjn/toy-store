const express = require('express');

const storesController = require('../controllers/stores-controllers'); 

const router = express.Router();

router.post('/newStore', storesController.newStore);

router.get('/getStores', storesController.getStores);

module.exports = router;

