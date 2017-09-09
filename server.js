const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gameRouter = require('./game/gameRoutes');

const app = express();

mongoose.connect('mongodb://localhost/spyfallApi', {
  useMongoClient: true,
});

// require('./util/seed.js');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/games', gameRouter);

app.listen(3000);
console.log('Listening on port 3000');
