import './App.css';

import { useState } from 'react';

import Spotify from './util/Spotify';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const search = (searchTerm) => {
    Spotify.search(searchTerm)
    .then(searchResults => console.log(searchResults))
  }

  return (
    <div className="App">
      <form onSubmit={() => search(searchQuery)}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
        <input type="submit"/>
        
      </form>
    </div>
  );
}

export default App;
