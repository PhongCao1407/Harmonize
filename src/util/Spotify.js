let accessToken;
const CLIENT_ID = "b7d5be16082f4e71853b935b420e72d7"
const REDIRECT_URI = window.location.href
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?"
const RESPONSE_TYPE = "token"
const AUTH_URL = AUTH_ENDPOINT +
  `client_id=${CLIENT_ID}&` +
  `response_type=${RESPONSE_TYPE}&` +
  `redirect_uri=${REDIRECT_URI}`;


const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresToken = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresToken * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = AUTH_URL;
    }
  }, logOut() {
    accessToken = ""
  }, searchTrack(searchTerm) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {

      return response.json();
    }).then(jsonResponse => {

      if (!jsonResponse.tracks) return [];
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        popularity: track.popularity,
        image: track.album.images[0]
      }))
    }).then(searchResults => {
      return searchResults
    });
  }, getAudioFeatures(trackID) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {

      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }, getTrack(trackID) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {

      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }, searchAlbum(searchTerm) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=album&q=${searchTerm}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {

      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.albums) return [];
      return jsonResponse.albums.items.map(album => ({
        name: album.name,
        artist: album.artists[0].name,
        id: album.id
      }))
    }).then(searchResults => {
      return searchResults
    });
  }, getAlbum(albumID) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/albums/${albumID}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {

      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }, searchArtist(searchTerm) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=artist&q=${searchTerm}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.artists) return [];
      return jsonResponse.artists.items.map(artist => ({
        name: artist.name,
        id: artist.id
      }))
    }).then(searchResults => {
      return searchResults
    });
  }, getArtist(artistID) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }, getArtistTopTrack(artistID) {
    accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }

};


export default Spotify;