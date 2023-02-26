import './App.css';

import Spotify from './util/Spotify';
import { SearchBar } from './components/SearchBar/SearchBar';

function App() {
  

  const search = (searchTerm) => {
    Spotify.search(searchTerm)
    .then(searchResults => console.log(searchResults))
  }

  return (
    <div className="App">
        <SearchBar search={search}/>
    </div>
  );
}

export default App;
