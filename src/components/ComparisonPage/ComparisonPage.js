import './ComparisonPage.css'

import { SearchBar } from '../SearchBar/SearchBar'

import { useEffect } from 'react'


const ComparisonPage = (props) => {
    useEffect(() => {
        const main = document.getElementsByTagName('main')[0]

        main.classList.add('search-bar-main')
    })

    const ChartBoxLeft = (props) => {
        return (
            <div className="chart-box">
                <SearchBar searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures} />
                <select>
                    <option>Albums</option>
                    <option>Artists</option>
                    <option>Tracks</option>
                </select>
            </div>
        )
    }

    const ChartBoxRight = (props) => {
        return (
            <div className="chart-box">
                <select>
                    <option>Albums</option>
                    <option>Artists</option>
                    <option>Tracks</option>
                </select>
                <SearchBar searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures} />

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
                <Attribute attributeName="Acousticness"></Attribute>
                <Attribute attributeName="Danceability"></Attribute>
                <Attribute attributeName="Energy"></Attribute>
                <Attribute attributeName="Intrumentalness"></Attribute>
                <Attribute attributeName="Liveness"></Attribute>
                <Attribute attributeName="Loudness"></Attribute>
                <Attribute attributeName="Speechiness"></Attribute>
                <Attribute attributeName="Valence"></Attribute>

            </div>
        )
    }

    return (
        <div className="comparison-page">
            <main>
                <ChartBoxLeft searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures}/>
                <SongAttributes />
                <ChartBoxRight searchTrack={props.searchTrack} getAudioFeatures={props.getAudioFeatures}/>
            </main>
        </div>
    )
}

export { ComparisonPage }