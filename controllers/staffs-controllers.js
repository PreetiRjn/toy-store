const mongoose = require('mongoose');

const Staff = require('../models/staff');
const Store = require('../models/store');
const HttpError = require('../models/http-error');

const newStaff = async (req, res, next) => {
    const { staffid, name, storeid } = req.body;
    const newstaff = new Staff({
        staffid, name, storeid
    });
    let store;
    try {
        store = await Store.findById(storeid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );
        console.log('Inhere ', err);
        return next(error);
    }
    if (!store) {
        const error = new HttpError('Could not find store for provided id.', 404);
        return next(error);
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newstaff.save({ session: sess });
        store.staffs.push(newstaff);
        await store.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating staffs failed, please try again.',
            500
        );
        return next(error);
    }
    res.json({ newstaff: newstaff.toObject({ getters: true }) });
}

const getStaffs = async (req, res, next) => {
    let allStaffs = '';
    try {
        allStaffs = await Staff.find().exec();
    } catch (error) {
        console.log('Error log - ', error);
        return res.json({ message: 'Something went wrong! Could not retrieve staffs information' })
    }
    res.json({
        allStaffs: allStaffs.map(staff =>
            staff.toObject({ getters: true })
        )
    });
}
exports.newStaff = newStaff;
exports.getStaffs = getStaffs;