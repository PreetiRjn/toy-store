const express = require('express');

const toysController = require('../controllers/toys-controllers'); 

const router = express.Router();

router.post('/newToy', toysController.newToy);

router.get('/getToys', toysController.getToys);

module.exports = router;

