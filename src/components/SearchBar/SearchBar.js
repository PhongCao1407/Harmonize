import './SearchBar.css'

import { useState } from "react";


const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTermChange = (e) => {
    console.log(props)
    setSearchQuery(e.target.value)
    props.search(searchQuery).then(songsList => {
      const datalist = document.getElementById('songs-list')
    
      for (let i = 0; i < songsList.length; i++) {
        const newOption = document.createElement('option')
        const song = songsList[i]
        newOption.value = song.name

        datalist.appendChild(newOption)
      }
    })

  }

  return (
    <div className="search-bar">
      <datalist id="songs-list">
        <option value="Test"></option>
      </datalist>


      <input type="search" list="songs-list" placeholder="Lookup A Track, Album, or Artist"
        onChange={(e) => handleTermChange(e)} />
      
    </div>
  )
}

export { SearchBar }