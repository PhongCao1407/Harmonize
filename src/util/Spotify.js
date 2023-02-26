import { CLIENT_ID } from './clientID'
let accessToken;
const REDIRECT_URI = "http://localhost:3000"
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
    },
    
};


export default Spotify;