import './SearchBar.css'

import { useState } from "react";

import Spotify from '../../util/Spotify';

const NUMBER_OF_OPTIONS = 5

let trackIDs = {}
let albumIDs = {}

const SearchBar = (props) => {
  let searchQuery = ''
  let categoryLeft = 'Tracks'
  let categoryRight = 'Tracks'

  const handleTermChange = (e, side) => {
    searchQuery = e.target.value

    if ((side === 'left' && categoryLeft === 'Tracks') || (side === 'right' && categoryRight === 'Tracks')) {
      Spotify.searchTrack(searchQuery).then(tracksList => {
        

        for (let i = 0; i < NUMBER_OF_OPTIONS; i++) {
          const option = document.getElementById(`option-${i+1}`)
          const track = tracksList[i]

          let trackNameAndID = track.name + ` (${track.artist})`

          trackIDs[trackNameAndID] = track.id

          option.value = trackNameAndID

        }
      })
    } else if ((side === 'left' && categoryLeft === 'Albums') || (side === 'right' && categoryRight === 'Albums')) {
      Spotify.searchAlbum(searchQuery).then(albumsList => {

        for (let i = 0; i < NUMBER_OF_OPTIONS; i++) {
          const option = document.getElementById(`option-${i+1}`)
          const album = albumsList[i]

          let albumNameAndID = album.name + ` (${album.artist})`

          albumIDs[albumNameAndID] = album.id

          option.value = albumNameAndID          
        }
      })
    }

  }

  const handleCategoryChange = (side) => {
    let newCategory = document.getElementById(`select-id-${side}`).value

    if (side === 'left') {
      categoryLeft = newCategory
    } else {
      categoryRight = newCategory
    }
  
  }

  const checkEnter = (e, side) => {
    if (e.keyCode === 13) {

      if ((side === 'left' && categoryLeft === 'Tracks') || (side === 'right' && categoryRight === 'Tracks')) {
        let trackNameRaw = searchQuery
        let trackID = trackIDs[trackNameRaw]

        Spotify.getAudioFeatures(trackID).then(features => {
          props.sendAudioFeatures(features, side)
        })
        Spotify.getTrack(trackID).then(data => {
          props.sendTrackData(data, side)
        })
      } else if ((side === 'left' && categoryLeft === 'Albums') || (side === 'right' && categoryRight === 'Albums')) {
        let albumID = albumIDs[searchQuery]
        
        Spotify.getAlbum(albumID).then(data => {
          
          props.sendAlbumData(data, side)

          const getTrackFeaturesSum = async () => {
            let acousticness = 0;
            let danceability = 0;
            let energy = 0;
            let instrumentalness = 0;
            let liveness = 0;
            let loudness = 0;
            let speechiness = 0;
            let valence = 0;

            var promiseArray = [];

            for (let i = 0; i < data.tracks.items.length; i++) {
              promiseArray.push(Spotify.getAudioFeatures(data.tracks.items[i].id).then(attributes => {
                acousticness += attributes['acousticness']
                danceability += attributes['danceability']
                energy += attributes['energy']
                instrumentalness += attributes['instrumentalness']
                liveness += attributes['liveness']
                loudness += attributes['loudness']
                speechiness += attributes['speechiness']
                valence += attributes['valence']
              }))
            }

            Promise.all(promiseArray).then(() => {
              acousticness = acousticness / data.tracks.items.length
              danceability = danceability / data.tracks.items.length
              energy = energy / data.tracks.items.length
              instrumentalness = instrumentalness / data.tracks.items.length
              liveness = liveness / data.tracks.items.length
              loudness = loudness / data.tracks.items.length
              speechiness = speechiness / data.tracks.items.length
              valence = valence / data.tracks.items.length

              let features = {
                acousticness: acousticness,
                danceability: danceability,
                energy: energy,
                instrumentalness: instrumentalness,
                liveness: liveness,
                loudness: loudness,
                speechiness: speechiness,
                valence: valence
              }
              props.sendAudioFeatures(features, side)
            })

          }
          getTrackFeaturesSum()
        })
      }

      //Clear search bar suggestions
      
      for (let i = 0; i < NUMBER_OF_OPTIONS; i++) {
        const option = document.getElementById(`option-${i+1}`)

        option.value = ''
      }

      e.preventDefault() //Make sure on term change is not called
      
    }
  }


  return (
    <div className="search-bar">

      <datalist id="tracks-list">
        <option id='option-1'></option>
        <option id='option-2'></option>
        <option id='option-3'></option>
        <option id='option-4'></option>
        <option id='option-5'></option>
      </datalist>
      <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
        onChange={(e) => handleTermChange(e, props.direction)}
        onKeyDown={(e) => checkEnter(e, props.direction)} />
      <select onChange={() => handleCategoryChange(props.direction)} id={`select-id-${props.direction}`}>
        <option value="Tracks">Tracks</option>
        <option value="Albums">Albums</option>
        
      </select>

    </div>
  )
  

}

export { SearchBar }