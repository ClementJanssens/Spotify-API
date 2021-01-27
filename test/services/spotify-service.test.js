const app = require('../../src/app');

describe('\'SpotifyService\' service', () => {
  it('registered the service', () => {
    const service = app.service('spotify-service');
    expect(service).toBeTruthy();
  });
});
