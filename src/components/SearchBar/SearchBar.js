import './SearchBar.css'

import { useState } from "react";

let trackIDs = {}
let albumIDs = {}

const SearchBar = (props) => {
  let searchQuery = ''
  let categoryLeft = 'Tracks'
  let categoryRight = 'Tracks'

  const handleTermChange = (e) => {
    console.log(e.target.value)

    searchQuery = e.target.value

    console.log(searchQuery)


    if (categoryLeft === 'Tracks') {
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
    } else if (categoryLeft === 'Albums') {
      props.searchAlbum(searchQuery).then(albumsList => {
        console.log(albumsList)
        const datalist = document.getElementById('tracks-list')

        for (let i = 0; i < albumsList.length; i++) {
          const newOption = document.createElement('option')
          const album = albumsList[i]

          let albumNameAndID = album.name + ` (${album.artist})`

          albumIDs[albumNameAndID] = album

          newOption.value = albumNameAndID

          datalist.appendChild(newOption)
        }
      })
    }




  }

  const handleLeftCategoryChange = () => {
    let newCategory = document.getElementById("select-id-left").value
    console.log(newCategory)

    categoryLeft = newCategory

  }

  const handleRightCategoryChange = () => {
    let newCategory = document.getElementById("select-id-right").value

    categoryRight = newCategory
    console.log(categoryRight)
  }

  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      if (categoryLeft === 'Tracks') {
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
      } else if (categoryLeft === 'Albums') {
        let albumID = albumIDs[searchQuery]

        
      }


      
    }
  }

  if (props.direction === "left") {
    return (
      <div className="search-bar">

        <datalist id="tracks-list">
        </datalist>
        <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
          onChange={(e) => handleTermChange(e)}
          onKeyDown={(e) => checkEnter(e)} />
        <select onChange={() => handleLeftCategoryChange()} id="select-id-left">
          <option value="Tracks">Tracks</option>
          <option value="Albums">Albums</option>
          <option value="Artists">Artists</option>
        </select>

      </div>
    )
  } else {
    return (<div className="search-bar">
      <select onChange={() => handleRightCategoryChange()} id="select-id-right">
        <option value="Tracks">Tracks</option>
        <option value="Albums">Albums</option>
        <option value="Artists">Artists</option>
      </select>
      <datalist id="tracks-list">
      </datalist>
      <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
        onChange={(e) => handleTermChange(e)}
        onKeyDown={(e) => checkEnter(e)} />

    </div>)
  }

}

export { SearchBar }