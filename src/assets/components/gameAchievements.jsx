import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/achiviements.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GameAchiviements(){
    const { id } = useParams()

    const [achiviementSuccess, setAchiviementSuccess] = useState([])
    const [achiviementLoading, setAchiviementLoading] = useState(false)
    const [achiviementError, setAchiviementError] = useState('')

    useEffect(()=>{
        setAchiviementLoading(true)
        fetch(`https://api.rawg.io/api/games/${id}/achievements?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Achiviement')
                }
                return res.json()
            })
            .then((data)=>{
                setAchiviementSuccess(data.results)
                setAchiviementLoading(false)
            })
            .catch((err)=>{
                setAchiviementError(err)
                setAchiviementLoading(false)
            })
    },[id])

    if(achiviementLoading){
        return <h1 style={{textAlign:'center', color:'#fff'}}>LOADING...</h1>
    }

    if(achiviementError){
        return <h1 style={{textAlign:'center', color:'#fff'}}>{achiviementError}</h1>
    }

    return(
        <div className="divGlobalAchiviement">
            {achiviementSuccess.map((achiviement)=>{
                return(
                    <div key={achiviement.id} className="divAchiviement">
                        <img src={achiviement.image} style={{width:'200px'}} className="imageAchiviement"/>
                        <h1 className="nameAchiviement">{achiviement.name}</h1>
                        <h3 className="h3Achiviement">PERCENT: {achiviement.percent}</h3>
                        <h3 className="h3Achiviement">DESCRIPTION: {achiviement.description}</h3>
                    </div>
                )
            })}
        </div>
    )
}