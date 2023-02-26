import './App.css';

import { useEffect, useState } from 'react';

import { LandingPage } from './components/LandingPage/LandingPage';
import { SearchBar } from './components/SearchBar/SearchBar';


function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])

 
  return (
    <div className="App">

      <LandingPage/>
      
    </div>
  );
}

export default App;
