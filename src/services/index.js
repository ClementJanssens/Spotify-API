const spotifyService = require('./spotify-service/spotify-service.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(spotifyService);
};
