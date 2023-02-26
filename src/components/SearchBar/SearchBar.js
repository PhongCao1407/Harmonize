import './SearchBar.css'

import { useState } from "react";

let trackIDs = {}

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTermChange = (e) => {

    setSearchQuery(e.target.value)
    props.searchTrack(searchQuery).then(tracksList => {
      console.log(tracksList)
      const datalist = document.getElementById('tracks-list')
    
      for (let i = 0; i < tracksList.length; i++) {
        const newOption = document.createElement('option')
        const track = tracksList[i]

        let trackNameAndID = track.name + ` (${track.artist})`

        trackIDs[trackNameAndID] = track.id

        newOption.value = trackNameAndID

        datalist.appendChild(newOption)
      }
    })

  }

  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      let trackNameRaw = searchQuery
      let trackID = trackIDs[trackNameRaw]
    
      console.log(trackID)
      props.getAudioFeatures(trackID).then(features => {
        console.log(features)
        props.sendAudioFeatures(features)
      })
      props.getTrack(trackID).then(data => {
        console.log(data)
        props.sendTrackData(data)
      })
    }
  }

  return (
    <div className="search-bar">
      <datalist id="tracks-list">
        
      </datalist>


      <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
        onChange={(e) => handleTermChange(e)}
        onKeyDown={(e) => checkEnter(e)} />
      
    </div>
  )
}

export { SearchBar }