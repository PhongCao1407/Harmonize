import './LandingPage.css'

import Spotify from '../../util/Spotify'

const LandingPage = (props) => {
    return (
        <div className='landing-page'>
            <main>
                <h1>WELCOME</h1>
                <a >
                    <button onClick={() => {
                        const token = Spotify.getAccessToken()
                        props.setToken(token)
                    }
                    }>
                        Sign In to Compare
                    </button>
                </a>
            </main>
            
        </div>

    )
}


export { LandingPage }