import './LandingPage.css'

import { CLIENT_ID } from '../../util/clientID'
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const LandingPage = (props) => {
    return (
        <div className='landing-page'>
            <header>
                <h2>SPOTIFY <span className='spotify-text'>COMPARE</span></h2>
            </header>
            <main>
                <h1>WELCOME</h1>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                    <button>Sign In to Compare</button>
                </a>
            </main>
            
        </div>

    )
}


export { LandingPage }