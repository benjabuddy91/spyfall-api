var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const games = [];
const locations = [
  { name: "Airplane" },
  { name: "Bank" },
  { name: "Beach" },
  { name: "Cathedral" },
  { name: "Circus Tent" },
  { name: "Corporate Party" },
  { name: "Crusader Army" },
  { name: "Casino" },
  { name: "Day Spa" },
  { name: "Embassy" },
  { name: "Hospital" },
  { name: "Hotel" },
  { name: "Military Base" },
  { name: "Movie Studio" },
  { name: "Ocean Liner" },
  { name: "Passenger Train" },
  { name: "Pirate Ship" },
  { name: "Polar Station" },
  { name: "Police Station" },
  { name: "Restaurant" },
  { name: "School" },
  { name: "Service Station" },
  { name: "Space Station" },
  { name: "Submarine" },
  { name: "Theater" },
  { name: "University" },
  { name: "World War II Squad" }
]
let gameIdCounter = 1;

app.get('/games/:id', (req, res) => {
  res.send(req.params.id);
})

app.post('/games', (req, res) => {
  const game = {
    players: [req.body.player],
    id: gameIdCounter.toString()
  }
  gameIdCounter++;
  games.push(game);
  res.send(req.body);
})

app.put('/games/:id/addPlayer', (req, res) => {
  let updatedGame = games[_.findIndex(games, { id: req.params.id })];
  updatedGame.players.push(req.body.player);
  res.send();
})

app.put('/games/:id/start', (req,res) => {
  let updatedGame = games[_.findIndex(games, { id: req.params.id })];
  updatedGame.startTime = new Date;
  updatedGame.location = _.sample(locations)
  res.send();
})

app.listen(3000);
console.log('Listening on port 3000');
