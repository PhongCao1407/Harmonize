import './ComparisonPage.css'

import circle from './static/circle.png'

import { SearchBar } from '../SearchBar/SearchBar'
import { charterLeft, charterRight } from '../ChartPage/ChartPage'

import Spotify from '../../util/Spotify'

import { useEffect, useState } from 'react'


const ComparisonPage = (props) => {
    
    // Get data from child
    const sendTrackAudio = (trackData, side) => {
        let acousticness = trackData['acousticness']
        let danceability = trackData['danceability']
        let energy = trackData['energy']
        let instrumentalness = trackData['instrumentalness']
        let liveness = trackData['liveness']
        let loudness = trackData['loudness']
        let speechiness = trackData['speechiness']
        let valence = trackData['valence']
        if (side === 'left') {
            charterLeft(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, '#58AC89')
        } else {
            charterRight(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, '#58AC89')
        }
    }


    const sendTrackData = (trackData, side) => {
        let artistImage = trackData.album.images[0].url
        let img = document.getElementById(`${side}-image`)
        img.src = artistImage
    
    }

    const sendAlbumData = (albumData, side) => {
        let albumImage = albumData.images[0].url
        let img = document.getElementById(`${side}-image`)
        img.src = albumImage
    }

    const sendArtistData = (artistData, side) => {
        let artistImage = artistData.images[0].url
        let img = document.getElementById(`${side}-image`)
        img.src = artistImage
    }


    useEffect(() => {
        const main = document.getElementsByTagName('main')[0]

        main.classList.add('search-bar-main')
        
    })

    const ChartBoxLeft = (props) => {
        return (
            <div className="chart-box">
                <div className='search-box'>
                    <SearchBar direction="left"
                        sendAudioFeatures={sendTrackAudio} 
                        sendTrackData={sendTrackData}
                        sendAlbumData={sendAlbumData}
                        sendArtistData={sendArtistData}/>
                </div>

                <div className='art-work'>
                    <div className='line'></div>
                    <img id="left-image" src=''></img> 
                    <div className='line'></div>
                </div>
                <div className='canvas-container'>
                    <canvas id='left-charts'></canvas>
                </div>
                
            </div>
        )
    }

    const ChartBoxRight = (props) => {
        return (
            <div className="chart-box">
                <div className="search-box">
                    <SearchBar direction="right"
                        sendAudioFeatures={sendTrackAudio} 
                        sendTrackData={sendTrackData}
                        sendAlbumData={sendAlbumData}
                        sendArtistData={sendArtistData}/>

                </div>

                <div className='art-work'>
                    <div className='line'></div>
                    <img id="right-image" src=''></img> 
                    <div className='line'></div>
                </div>

                <div className="canvas-container">
                    <canvas id='right-charts'></canvas>
                </div>
            </div>
        )
    }

    const SongAttributes = () => {
        const Attribute = (props) => {
            return (
                <div className={props.attribute + ' attribute'}>
                    <h3>{props.attributeName}</h3>
                </div>
            )
        }

        return (
            <div className="song-attributes">
                <img id = "wave" src={circle}/>
                <Attribute attributeName="Acousticness" attribute="acousticness"></Attribute>
                <Attribute attributeName="Danceability" attribute="danceability"></Attribute>
                <Attribute attributeName="Energy" attribute="energy"></Attribute>
                <Attribute attributeName="Instrumentalness" attribute="instrumentalness"></Attribute>
                <Attribute attributeName="Liveness" attribute="liveness"></Attribute>
                <Attribute attributeName="Speechiness" attribute="speechiness"></Attribute>
                <Attribute attributeName="Valence" attribute="valence"></Attribute>

            </div>
        )
    }

    
    return (
        <div className="comparison-page">
            <main>
                <ChartBoxLeft/>
                <SongAttributes />
                <ChartBoxRight/>
            </main>
        </div>
    )
}

export { ComparisonPage }