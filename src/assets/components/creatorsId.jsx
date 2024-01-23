import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/creatorsId.css';

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function CreatorsId(){
    const { id } = useParams()
    const [creatorSuccess, setCreatorSuccess] = useState([]);
    const [creatorLoading, setCreatorLoading] = useState(false);
    const [creatorError, setCreatorError] = useState('')

    useEffect(()=>{
        setCreatorLoading(true)

        fetch(`https://api.rawg.io/api/creators/${id}?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Creators')
                }
                return res.json()
            })
            .then((data)=>{
                setCreatorSuccess(data)
                setCreatorLoading(false)
            })
            .catch((err)=>{
                setCreatorError(err)
                setCreatorLoading(false)
            })
    },[id])

    if(creatorLoading){
        return <h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(creatorError){
        return <h1 style={{textAlign:'center', color:'#fff'}}>{creatorError}</h1>
    }

    return(
        <div className="divGlobalCreatorId">
            <div key={creatorSuccess.id} className="div-semiGlobal-creatorId">
                <h1>{creatorSuccess.name}</h1>
                <img src={creatorSuccess.image} className="imageCreatorId"/>
            </div>
            <div className="creatorId-info">
                <h3>Description</h3>
                <p>{creatorSuccess.description}</p>
            </div>
        </div>
    )
}