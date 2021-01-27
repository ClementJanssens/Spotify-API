// Initializes the `SpotifyService` service on path `/spotify-service`
const { SpotifyService } = require('./spotify-service.class');
const hooks = require('./spotify-service.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/spotify-service', new SpotifyService(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('spotify-service');

  service.hooks(hooks);
};
