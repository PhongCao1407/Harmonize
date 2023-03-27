import './App.css';

import { useEffect, useState } from 'react';

import { Routes, Route, Navigate ,useNavigate } from 'react-router-dom';

import Spotify from './util/Spotify';

import { LandingPage } from './components/LandingPage/LandingPage';
import { ComparisonPage } from './components/ComparisonPage/ComparisonPage';

let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

function App() {
  const [token, setToken] = useState("")

  const navigator = useNavigate()

  const navigateLandingPage = () => {
    navigator('/');
  }

  const navigateComparisonPage = () => {
    if (token !== "") {
      navigator('/ComparisonPage')
    } else {
      let newToken = Spotify.getAccessToken().then
      setToken(newToken)
      navigator('/ComparisonPage')
    }
  }


  useEffect(() => {

    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch != null) {
      navigateComparisonPage()
    }
  }, [])


  return (
    <div className="App">
      <header>
        <a onClick={navigateLandingPage}><h2>SPOTIFY <span className='spotify-text'>COMPARE</span></h2></a>
      </header>

      <Routes>
        <Route path='/' element={<LandingPage onClick={navigateComparisonPage}/>} />
        <Route path='/ComparisonPage' element={<ComparisonPage/>} />
      </Routes>


    </div>
  );
}

export default App;
