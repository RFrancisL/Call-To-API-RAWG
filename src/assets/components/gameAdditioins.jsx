import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../styles/gameAdittions.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export default function GetAdditions(){
    const { id } = useParams()

    const [additionsSuccess, setAdditionsSuccess] = useState([])
    const [additionsLoading, setAdditionsLoading] = useState(false)
    const [additionsError, setAdditionsError] = useState('')
    const [showMoreAdditions, setShowMoreAdditions] = useState([])


    useEffect(()=>{
        fetch(`https://api.rawg.io/api/games/${id}/additions?${queryString}`)
        .then((res)=>{
            if(!res.ok){
                throw new Error('Fetching ERROR Additions')
            }
            return res.json()
        })
        .then((data)=>{
            setAdditionsSuccess(data.results)
            setShowMoreAdditions(new Array(data.results.length).fill(false));
            setAdditionsLoading(false)
        })
        .catch((err)=>{
            setAdditionsError(err)
            setAdditionsLoading(false)
        })
    },[id])

    if(additionsLoading){
        return <h1>LOADING...</h1>
    }

    if(additionsError){
        return <h1>{additionsError}</h1>
    }

    const handleExpansion = (id) => {
        setShowMoreAdditions((prevExpanded) => {
          const newExpanded = [...prevExpanded];
          newExpanded[id] = !newExpanded[id];
          return newExpanded;
        });
      };

    return(
        <div className="div-global-additions">
            {additionsSuccess.map((addition, id)=>{
                return(
                    <div key={addition.id} className="div-semiglobal-additions">
                        <img src={addition.background_image} className="image-additions" />
                        <div className="div-data-additions">
                            <h1 className="additions-name">{addition.name}</h1>
                            <p className="additions-released">Released: {addition.released}</p>
                            {!showMoreAdditions[id] ? (
                                <div>
                                    <button type="submit" className="expansionBtn" onClick={()=>{handleExpansion(id)}}>VER MAS</button>
                                </div>
                            ):(
                                <div>
                                    <h3>Rating: {addition.rating}</h3>
                                    <h3>Rating Top: {addition.rating_top}</h3>
                                    <button type="submit" className="expansionBtn" onClick={()=>{handleExpansion(id)}}>VER MENOS</button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}