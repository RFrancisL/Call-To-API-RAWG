import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/creators.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function Creators(){
    const [creatorSuccess, setCreatorSuccess] = useState([]);
    const [creatorLoading, setCreatorLoading] = useState(false);
    const [creatorError, setCreatorError] = useState('')

    useEffect(()=>{
        setCreatorLoading(true)

        fetch(`https://api.rawg.io/api/creators?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Creators')
                }
                return res.json()
            })
            .then((data)=>{
                setCreatorSuccess(data.results)
                setCreatorLoading(false)
            })
            .catch((err)=>{
                setCreatorError(err)
                setCreatorLoading(false)
            })
    },[])

    if(creatorLoading){
        return <h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(creatorError){
        return <h1 style={{textAlign:'center', color:'#fff'}}>{creatorError}</h1>
    }

    return(
        <div className="divGlobalCreators">
            {creatorSuccess.map((creator)=>{
                return(
                    <>
                        <Link to={`/creators/${creator.id}`} style={{listStyle:'none', textDecoration:'none'}}>
                            <div key={creator.id} className="divSemiGlobalCreators">
                                <h1>{creator.name}</h1>
                                <img src={creator.image} className="imageCreators"/>
                                <h3>Games Count: {creator.games_count}</h3>
                            </div>
                        </Link>
                    </>                 
                )
            })}
        </div>
    )
}