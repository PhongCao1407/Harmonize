import './SearchBar.css'

import { useState } from "react";

let trackIDs = {}
let albumIDs = {}

const SearchBar = (props) => {
  console.log(props)
  let searchQuery = ''
  let categoryLeft = 'Tracks'
  let categoryRight = 'Tracks'

  const handleLeftTermChange = (e) => {
    // console.log(e.target.value)

    searchQuery = e.target.value

    // console.log(searchQuery)


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
        // console.log(albumsList)
        const datalist = document.getElementById('tracks-list')

        for (let i = 0; i < albumsList.length; i++) {
          const newOption = document.createElement('option')
          const album = albumsList[i]

          let albumNameAndID = album.name + ` (${album.artist})`

          albumIDs[albumNameAndID] = album.id

          newOption.value = albumNameAndID

          datalist.appendChild(newOption)
        }
      })
    }


  }

  const handleRightTermChange = (e) => {
    // console.log(e.target.value)

    searchQuery = e.target.value

    // console.log(searchQuery)


    if (categoryRight === 'Tracks') {
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
    } else if (categoryRight === 'Albums') {
      props.searchAlbum(searchQuery).then(albumsList => {
        // console.log(albumsList)
        const datalist = document.getElementById('tracks-list')

        for (let i = 0; i < albumsList.length; i++) {
          const newOption = document.createElement('option')
          const album = albumsList[i]

          let albumNameAndID = album.name + ` (${album.artist})`

          albumIDs[albumNameAndID] = album.id

          newOption.value = albumNameAndID

          datalist.appendChild(newOption)
        }
      })
    }


  }

  const handleLeftCategoryChange = () => {
    let newCategory = document.getElementById("select-id-left").value
    categoryLeft = newCategory

  }

  const handleRightCategoryChange = () => {
    let newCategory = document.getElementById("select-id-right").value

    categoryRight = newCategory
    console.log(categoryRight)
  }

  const checkLeftEnter = (e) => {
    if (e.keyCode === 13) {
      if (categoryLeft === 'Tracks') {
        let trackNameRaw = searchQuery
        let trackID = trackIDs[trackNameRaw]

        // console.log(trackID)
        props.getAudioFeatures(trackID).then(features => {
          // console.log(features)
          props.sendAudioFeatures(features)
        })
        props.getTrack(trackID).then(data => {
          console.log(data)
          props.sendTrackData(data)
        })
      } else if (categoryLeft === 'Albums') {
        // console.log(searchQuery)
        // console.log(albumIDs)
        let albumID = albumIDs[searchQuery]
        console.log(albumID)
        props.getAlbum(albumID).then(data => {
          // console.log(data.tracks.items)

          props.sendAlbumData(data)

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
              promiseArray.push(props.getAudioFeatures(data.tracks.items[i].id).then(attributes => {
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

              console.log(features)

              props.sendAudioFeatures(features)
            })

          }

          getTrackFeaturesSum()

        })
      }



    }
  }

  const checkRightEnter = (e) => {
    if (e.keyCode === 13) {
      if (categoryRight === 'Tracks') {
        let trackNameRaw = searchQuery
        let trackID = trackIDs[trackNameRaw]

        // console.log(trackID)
        props.getAudioFeatures(trackID).then(features => {
          // console.log(features)
          props.sendAudioFeatures(features)
        })
        props.getTrack(trackID).then(data => {
          console.log(data)
          props.sendTrackData(data)
        })
      } else if (categoryRight === 'Albums') {
        // console.log(searchQuery)
        // console.log(albumIDs)
        let albumID = albumIDs[searchQuery]
        console.log(albumID)
        props.getAlbum(albumID).then(data => {
          // console.log(data.tracks.items)

          props.sendAlbumData(data)

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
              promiseArray.push(props.getAudioFeatures(data.tracks.items[i].id).then(attributes => {
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

              console.log(features)

              props.sendAudioFeatures(features)
            })

          }

          getTrackFeaturesSum()

        })
      }



    }
  }

  if (props.direction === "left") {
    return (
      <div className="search-bar">

        <datalist id="tracks-list">
        </datalist>
        <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
          onChange={(e) => handleLeftTermChange(e)}
          onKeyDown={(e) => checkLeftEnter(e)} />
        <select onChange={() => handleLeftCategoryChange()} id="select-id-left">
          <option value="Tracks">Tracks</option>
          <option value="Albums">Albums</option>
          
        </select>

      </div>
    )
  } else {
    return (<div className="search-bar">
      <select onChange={() => handleRightCategoryChange()} id="select-id-right">
        <option value="Tracks">Tracks</option>
        <option value="Albums">Albums</option>
        
      </select>
      <datalist id="tracks-list">
      </datalist>
      <input type="search" list="tracks-list" placeholder="Lookup a Track, Album, or Artist"
        onChange={(e) => handleRightTermChange(e)}
        onKeyDown={(e) => checkRightEnter(e)} />

    </div>)
  }

}

export { SearchBar }