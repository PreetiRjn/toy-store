const express = require('express');

const staffsController = require('../controllers/staffs-controllers'); 

const router = express.Router();

router.post('/newStaff', staffsController.newStaff);

router.get('/getStaffs', staffsController.getStaffs);

module.exports = router;

