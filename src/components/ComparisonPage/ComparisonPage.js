import './ComparisonPage.css'

import wave from './static/wave.png'

import { SearchBar } from '../SearchBar/SearchBar'
import { charterLeft, charterRight } from '../ChartPage/ChartPage'

import { useEffect, useState } from 'react'


const ComparisonPage = (props) => {
    
    
    // Get data from child
    const sendTrackAudioLeft = (trackData) => {
        
        let acousticness = trackData['acousticness']
        let danceability = trackData['danceability']
        let energy = trackData['energy']
        let instrumentalness = trackData['instrumentalness']
        let liveness = trackData['liveness']
        let loudness = trackData['loudness']
        let speechiness = trackData['speechiness']
        let valence = trackData['valence']
        charterLeft(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, '#58AC89')
        
    }

    const sendTrackAudioRight = (trackData) => {
        let acousticness = trackData['acousticness']
        let danceability = trackData['danceability']
        let energy = trackData['energy']
        let instrumentalness = trackData['instrumentalness']
        let liveness = trackData['liveness']
        let loudness = trackData['loudness']
        let speechiness = trackData['speechiness']
        let valence = trackData['valence']
        charterRight(acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, '#58AC89')
    }

    const sendTrackDataLeft = (trackData) => {
        let artistImage = trackData.album.images[0].url
        let img = document.getElementById('left-image')
        img.src = artistImage
        

    }

    const sendTrackDataRight = (trackData) => {
        let artistImage = trackData.album.images[0].url
        let img = document.getElementById('right-image')
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
                    <SearchBar searchTrack={props.searchTrack} 
                        getAudioFeatures={props.getAudioFeatures} sendAudioFeatures={sendTrackAudioLeft} 
                        getTrack={props.getTrack} sendTrackData={sendTrackDataLeft}/>
                    <select>
                        <option>Albums</option>
                        <option>Artists</option>
                        <option>Tracks</option>
                    </select>
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
                    <select>
                        <option>Albums</option>
                        <option>Artists</option>
                        <option>Tracks</option>
                    </select>
                    <SearchBar searchTrack={props.searchTrack} 
                        getAudioFeatures={props.getAudioFeatures} sendAudioFeatures={sendTrackAudioRight} 
                        getTrack={props.getTrack} sendTrackData={sendTrackDataRight}/>

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
                <div className='attribute'>
                    <h3>{props.attributeName}</h3>
                </div>
            )
        }

        return (
            <div className="song-attributes">
                <img src={wave}/>
                <Attribute attributeName="Acousticness"></Attribute>
                <Attribute attributeName="Danceability"></Attribute>
                <Attribute attributeName="Energy"></Attribute>
                <Attribute attributeName="Intrumentalness"></Attribute>
                <Attribute attributeName="Liveness"></Attribute>
                <Attribute attributeName="Speechiness"></Attribute>
                <Attribute attributeName="Valence"></Attribute>

            </div>
        )
    }

    return (
        <div className="comparison-page">
            <main>
                <ChartBoxLeft searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures} getTrack={props.getTrack}/>
                <SongAttributes />
                <ChartBoxRight searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures} getTrack={props.getTrack}/>
            </main>
        </div>
    )
}

export { ComparisonPage }