import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/developmentTeam.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GetDevelopmentTeam(){
    const { id } = useParams()

    const[teamSuccess, setTeamSuccess] = useState([])
    const[teamLoading, setTeamLoading] = useState(false)
    const [teamError, setTeamError] = useState('') 


    useEffect(()=>{
        fetch(`https://api.rawg.io/api/games/${id}/development-team?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching Error DLC')
                }
                return res.json()
            })
            .then((data)=>{
                setTeamSuccess(data.results);
                setTeamLoading(false);
            })
            .catch((err)=>{
                setTeamError(err.message);
                setTeamLoading(false)
            })
    },[id])

    if(teamLoading){
        return <h1>LOADING...</h1>
    }

    if(teamError){
        return<h1>{teamError}</h1>
    }

    return(
        <div className="divDevelopTeamGlobal"> 
            {teamSuccess.map((team)=>{
                return(
                    <div key={team.id} className="div-dlc">
                        <p className="team-name"><b>|{team.name}|</b></p>
                    </div>
                )
            })}
        </div>
    )
}