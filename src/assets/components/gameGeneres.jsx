import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import '../styles/generes.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GetGeneres(){
    const [generesSuccess, setGeneresSuccess] = useState([])
    const [generesLoading, setGeneresLoading] = useState(false)
    const [generesError, setGeneresError] = useState('')

    useEffect(()=>{
        setGeneresLoading(true)
        fetch(`https://api.rawg.io/api/genres?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Error feching Genres')
                }
                return res.json()
            })
            .then((data)=>{
                setGeneresSuccess(data.results)
                setGeneresLoading(false)
            })
            .catch((err)=>{
                setGeneresError(err)
                setGeneresLoading(false)
            })
    },[])

    if(generesLoading){
        return <h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(generesError){
        return <h1 style={{textAlign:'center', color:'#fff'}}>{generesError}</h1>
    }

    return(
        <div className="divGlobalGenere">
            {generesSuccess.map((generes)=>{
                return(
                    <Link key={generes.id} to={`/generes/${generes.id}`} style={{ textDecoration: 'none'}}>
                        <div key={generes.id} className="divCard">
                            <img src={generes.image_background} className="genere-image"/>
                            <h1 className="name-genere">{generes.name}</h1>
                            <p className="games-count">Games: {generes.games_count}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}