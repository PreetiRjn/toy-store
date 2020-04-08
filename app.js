const express = require('express');
const bodyparser = require('body-parser');
const mongoPractice = require('./mongoose');

const app = express();

app.use(bodyparser.json());

app.post('/newToy', mongoPractice.newToy);

app.get('/getToys', mongoPractice.getToys);

app.listen(4000);

