import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/gameSeries.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GameSeries(){
    const { id } = useParams();

    const [seriesSuccess, setSeriesSuccess] = useState([])
    const [seriesLoading, setSeriesLoading] = useState(false)
    const [seriesError, setSeriesError] = useState('')

    useEffect(()=>{
        setSeriesLoading(true);

        fetch(`https://api.rawg.io/api/games/${id}/game-series?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Game Series')
                }
                return res.json()
            })
            .then((data)=>{
                setSeriesSuccess(data.results)
                setSeriesLoading(false)
            })
            .then((err)=>{
                setSeriesError(err)
                setSeriesLoading(false)
            })
    },[id])

    if(seriesLoading){
        return<h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(seriesError){
        return<h1 style={{textAlign:'center', color:'#fff'}}>{seriesError}</h1>
    }

    return(
        <div className="divGlobalGameSeries">
            {seriesSuccess.map((serie)=>{
                return(
                    <div key={serie.id} className="divGameSeries">
                        <img src={serie.background_image} className="gameSeriesImage"/>
                        <h1 className="gameSerieName">{serie.name}</h1>
                        <h3 className="gameSerieReleased">Released: {serie.released}</h3>
                    </div>
                )
            })}
        </div>
    )
}