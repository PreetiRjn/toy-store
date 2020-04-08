const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const toysRoute = require('./routes/toys-routes');
const url = 'mongodb+srv://preeti:mydatabase@cluster0-pojb7.mongodb.net/toystore?retryWrites=true&w=majority';

const app = express();

app.use(bodyparser.json());

app.use('/api/toys', toysRoute);

app.listen(4000);

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>{
            console.log('Connected to Database');
        })
        .catch((error)=>{
            console.log('Connection to database failed -- ',error);
        });