import { clientID } from './clientID'

let accessToken;
const authURL = 'https://accounts.spotify.com/authorize?' +
    `client_id=${clientID}&` +
    'response_type=token&scope=playlist-modify-public&' + 
    `redirect_uri=http://localhost:3000`;


const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            return accessToken;
        } else {
            window.location = authURL;
        }
    },
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken()
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
                uri: track.uri
            }))
        })
    },
};


export default Spotify;