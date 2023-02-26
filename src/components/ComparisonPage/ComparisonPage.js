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
                <SearchBar search={props.search} />
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
                <SearchBar search={props.search} />

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
                <ChartBoxLeft search={props.search} />
                <SongAttributes />
                <ChartBoxRight search={props.search} />
            </main>
        </div>
    )
}

export { ComparisonPage }