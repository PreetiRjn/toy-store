const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const toysRoute = require('./routes/toys-routes');
const staffsRoute = require('./routes/staffs-routes');
const storesRoute = require('./routes/stores-routes');
const HttpError = require('./models/http-error');

const url = 'mongodb+srv://preeti:mydatabase@cluster0-pojb7.mongodb.net/toystore?retryWrites=true&w=majority';

const app = express();
app.use(bodyparser.json());

app.use('/api/toys', toysRoute);
app.use('/api/stores', storesRoute);
app.use('/api/staffs', staffsRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
  
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>{
            console.log('Connected to Database');
            app.listen(4000);
        })
        .catch((error)=>{
            console.log('Connection to database failed -- ',error);
        });