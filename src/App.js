import './App.css';

import { useEffect, useState } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';

import Spotify from './util/Spotify';

import { LandingPage } from './components/LandingPage/LandingPage';
import { ComparisonPage } from './components/ComparisonPage/ComparisonPage';


function App() {
  const [token, setToken] = useState("")

  const navigator = useNavigate()

  const navigateLandingPage = () => {
    navigator('/');
  }

  const navigateComparisonPage = () => {
    navigator('/ComparisonPage')
  }

  const searchTrack = (searchTerm) => {

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: { Authorization: `Bearer ${token}` }
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
        popularity: track.popularity
      }))
    }).then(searchResults => {
      return searchResults
    });
  }

  const getAudioFeatures = (songID) => {

    return fetch(`https://api.spotify.com/v1/audio-features/${songID}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse
    });
  }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")


    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

    if (token != null) {
      navigateComparisonPage()
    }
  }, [])


  return (
    <div className="App">
      <header>
        <a onClick={navigateLandingPage}><h2>SPOTIFY <span className='spotify-text'>COMPARE</span></h2></a>
      </header>
      <Routes>
        <Route path='/' element={<LandingPage setToken={setToken}/>} />
        <Route path='/ComparisonPage' element={<ComparisonPage searchTrack={searchTrack} getAudioFeatures={getAudioFeatures} />} />
      </Routes>


    </div>
  );
}

export default App;
