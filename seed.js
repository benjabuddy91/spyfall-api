const Location = require('./locationModel');
const Game = require('./gameModel');

const locations = [
  { name: 'Airplane' },
  { name: 'Bank' },
  { name: 'Beach' },
  { name: 'Cathedral' },
  { name: 'Circus Tent' },
  { name: 'Corporate Party' },
  { name: 'Crusader Army' },
  { name: 'Casino' },
  { name: 'Day Spa' },
  { name: 'Embassy' },
  { name: 'Hospital' },
  { name: 'Hotel' },
  { name: 'Military Base' },
  { name: 'Movie Studio' },
  { name: 'Ocean Liner' },
  { name: 'Passenger Train' },
  { name: 'Pirate Ship' },
  { name: 'Polar Station' },
  { name: 'Police Station' },
  { name: 'Restaurant' },
  { name: 'School' },
  { name: 'Service Station' },
  { name: 'Space Station' },
  { name: 'Submarine' },
  { name: 'Theater' },
  { name: 'University' },
  { name: 'World War II Squad' },
];

const seedLocations = () => {
  const promises = locations.map(location => Location.create(location));
  return Promise.all(promises);
};

const seedGames = () => {
  const promise = Game.create({ players: ['Benjamin'] });
  return promise;
};

Location.remove().exec()
  .then(seedLocations)
  .then(seedGames)
  .then((data) => {
    console.log(data);
    console.log('Seeding done');
  });
