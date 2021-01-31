const { Service } = require('feathers-memory');
const axios = require('axios').default;
const qs = require('querystring');

exports.SpotifyService = class SpotifyService extends Service {
  async find(params) {
    const { artistName } = params.query;
    if (!artistName)
      return [];

    // On devrait faire les choses mieux & surement ne pas prendre un nouveau token à chaque appel. Pour les besoins de la démo, ce genre d'algo est suffisant, je pense ;)
    const data = qs.stringify({
      grant_type: 'client_credentials'
    });
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      auth: {
        username: '92ecc7e9b5c54ca1b21b337ea997d8dc',
        password: '3e800f7761a24389a25ab154f7c89b1b'
      }
    };
    const token = await axios.post(
      'https://accounts.spotify.com/api/token',
      data,
      headers
    ).then(({ data }) => {
      return data.access_token;
    });

    const artists = await axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=FR&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      return data.artists;
    });

    for (let artist of artists.items) {
      const albums = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=single,album`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(({ data }) => {
        return data.items;
      });

      artist.albums = albums;
    }

    return artists;
  }
};
