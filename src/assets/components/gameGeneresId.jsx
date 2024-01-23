import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/generesId.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GetGeneresId(){
    const { id } = useParams()

    const [genereSuccess, setGenereSuccess] = useState([])
    const [genereLoading, setGenereLoading] = useState(false)
    const [genereError, setGenereError] = useState('')

    useEffect(()=>{
        setGenereLoading(true)
        fetch(`https://api.rawg.io/api/genres/${id}?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Generes Id')
                }
                return res.json()
            })
            .then((data)=>{
                setGenereSuccess(data)
                setGenereLoading(false)
            })
            .catch((err)=>{
                setGenereError(err)
                setGenereLoading(false)
            })
    },[id])

    if(genereLoading){
        return <h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(genereError){
        return <h1 style={{textAlign:'center', color:'#fff'}}>{genereError}</h1>
    }

    return(
        <div className="divGlobalGeneresId">
            <div key={genereSuccess.id} className="div-semiGlobal-generesId">
                <img src={genereSuccess.image_background} className="image-genereId"/>
                <div className="generId-info">
                    <h1 className="genereId-name">{genereSuccess.name}</h1>
                    <p className="genereId-games-count">Games: {genereSuccess.games_count}</p>
                </div>
            </div>
            <div>
                <h3 className="genereId-description">{genereSuccess.description}</h3>
            </div>
        </div>
    )
}