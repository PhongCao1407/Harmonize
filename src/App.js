import './App.css';

import { useEffect, useState } from 'react';

import { Routes, Route, Navigate ,useNavigate } from 'react-router-dom';

import Spotify from './util/Spotify';

import { LandingPage } from './components/LandingPage/LandingPage';
import { ComparisonPage } from './components/ComparisonPage/ComparisonPage';


function App() {
  const [token, setToken] = useState("")

  const navigator = useNavigate()

  const navigateLandingPage = () => {
    navigator('/Harmonize');
  }

  const navigateComparisonPage = () => {
    if (token !== "") {
      navigator('/Harmonize/ComparisonPage')
    } else {
      let newToken = Spotify.getAccessToken().then
      setToken(newToken)
      navigator('/Harmonize/ComparisonPage')
    }
  }

  const logOut = () => {
    Spotify.logOut()
    setToken("")
  }

  useEffect(() => {

    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (accessTokenMatch != null) {
      navigateComparisonPage()
    }
  }, [])

  useEffect(() => {
    if (token === "") {
      navigateLandingPage()
    } else {
      navigateComparisonPage()
    }
  }, [token])


  return (
    <div className="App">
      <header>
        <a onClick={navigateLandingPage}><h2><span className='spotify-text'>Harmonize</span></h2></a>
        <button onClick={logOut}>Log Out</button>
      </header>

      <Routes>
        <Route path='/Harmonize' element={<LandingPage onClick={navigateComparisonPage}/>} />
        <Route path="/" element={<Navigate replace to="/Harmonize" />} />
        <Route path='/Harmonize/ComparisonPage' element={<ComparisonPage/>} />
      </Routes>


    </div>
  );
}

export default App;
