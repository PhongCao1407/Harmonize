import './ComparisonPage.css'

import circle from './static/circle.png'

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

    const sendAlbumDataLeft = (albumData) => {
        console.log(albumData)
        let albumImage = albumData.images[0].url
        let img = document.getElementById('left-image')
        img.src = albumImage
    }

    const sendAlbumDataRight = (albumData) => {
        let albumImage = albumData.images[0].url
        let img = document.getElementById('right-image')
        img.src = albumImage
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
                        searchTrack={props.searchTrack} 
                        getAudioFeatures={props.getAudioFeatures} sendAudioFeatures={sendTrackAudioLeft} 
                        getTrack={props.getTrack} sendTrackData={sendTrackDataLeft}
                        searchAlbum={props.searchAlbum} getAlbum={props.getAlbum}
                        sendAlbumData={sendAlbumDataLeft}/>
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
                        searchTrack={props.searchTrack} 
                        getAudioFeatures={props.getAudioFeatures} sendAudioFeatures={sendTrackAudioRight} 
                        getTrack={props.getTrack} sendTrackData={sendTrackDataRight}
                        searchAlbum={props.searchAlbum} getAlbum={props.getAlbum}
                        sendAlbumData={sendAlbumDataRight}/>

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
                <ChartBoxLeft searchTrack={props.searchTrack} 
                getAudioFeatures={props.getAudioFeatures} 
                getTrack={props.getTrack}
                searchAlbum={props.searchAlbum}
                getAlbum={props.getAlbum}/>
                <SongAttributes />
                <ChartBoxRight searchTrack={props.searchTrack} 
                getAudioFeatures={props.getAudioFeatures} 
                getTrack={props.getTrack}
                searchAlbum={props.searchAlbum}
                getAlbum={props.getAlbum}/>
            </main>
        </div>
    )
}

export { ComparisonPage }