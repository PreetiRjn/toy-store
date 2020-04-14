const express = require('express');

const toysController = require('../controllers/toys-controllers'); 

const router = express.Router();

router.post('/newToy', toysController.newToy);

router.get('/getToys', toysController.getToys);

router.post('/getToysByCategory', toysController.getToysByCategory);

router.patch('/updateToy/:id', toysController.updateToy);

router.delete('/deleteToy/:id', toysController.deleteToy);

module.exports = router;

