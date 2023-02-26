import './SearchBar.css'

import { useState } from "react";

let songIDs = {}

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTermChange = (e) => {

    setSearchQuery(e.target.value)
    props.searchTrack(searchQuery).then(songsList => {
      console.log(songsList)
      const datalist = document.getElementById('songs-list')
    
      for (let i = 0; i < songsList.length; i++) {
        const newOption = document.createElement('option')
        const song = songsList[i]

        let songNameAndID = song.name + ` (${song.artist})`

        songIDs[songNameAndID] = song.id

        newOption.value = songNameAndID

        datalist.appendChild(newOption)
      }
    })

  }

  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      let songNameRaw = searchQuery
      let songID = songIDs[songNameRaw]
    
      console.log(songID)
      props.getAudioFeatures(songID).then(features => {
        console.log(features)
      })
    }
  }

  return (
    <div className="search-bar">
      <datalist id="songs-list">
        
      </datalist>


      <input type="search" list="songs-list" placeholder="Lookup A Track, Album, or Artist"
        onChange={(e) => handleTermChange(e)}
        onKeyDown={(e) => checkEnter(e)} />
      
    </div>
  )
}

export { SearchBar }