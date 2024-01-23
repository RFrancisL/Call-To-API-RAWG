// detailsGame.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetScreenshotsAndTrailers } from "./gameComponents.jsx";
import "../styles/detailsGames.css"
import GetDevelopmentTeam from "./gameDevelopmentTeam.jsx";

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()


export default function DetailsGame(){
    const { id } = useParams()
    const [stateSuccess, setStateSuccess] = useState([]);
    const [stateLoading, setStateLoading] = useState(false);
    const [stateError, setStateError] = useState('');

    useEffect(()=>{
        setStateLoading(true)
        fetch(`https://api.rawg.io/api/games/${id}?${queryString}`)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching Error');
                }
                return res.json();
            })
            .then((data)=>{
                setStateSuccess(data);
                setStateLoading(false);
            })
            .catch((err)=>{
                setStateError(err.message);
                setStateLoading(false);
            })
    },[id])


    if(stateLoading){
        return <h1 style={{textAlign: 'center', color:'#fff'}}>LOADING...</h1>
    }

    if(stateError){
        return <h1 style={{textAlign: 'center', color:'#fff'}}>{stateError}</h1>
    }


    return(
        <>
            <div id="carouselContainer">
                <div key={stateSuccess.id} className="divSemiGlobal">
                    <h1 className="gameName">{stateSuccess.name}</h1>              
                    <img src={stateSuccess.background_image} className="bgImage"/>
                    <div className="gameData">
                        <GetScreenshotsAndTrailers/>
                        <div className="gameInfo">
                            <h3>Released: {stateSuccess.released}</h3>
                            <h3>Rating: {stateSuccess.rating}</h3>
                            <h3>Rating Top: {stateSuccess.rating_top}</h3>
                            <h3><a href={stateSuccess.reddit_url} >REDDIT PAGE</a></h3>
                            <h3>Metacritic: {stateSuccess.metacritic}⭐⭐</h3>
                            <h3><a href={stateSuccess.metacritic_url}>METACRITIC PAGE</a></h3>
                            <h3>DEVELOPMENT TEAM</h3>
                            <GetDevelopmentTeam/>
                        </div>
                    </div>
                        
                    <div className="game-description">
                        <h3>{stateSuccess.description_raw}</h3>
                    </div>
                </div>
            </div>
            <h1 style={{textAlign:'center', color: '#fff'}}>MORE</h1>
                <div className="game-more">
                    <Link to={`/games/${id}/achiviements`} className="game-more-links">
                        <div >
                            <div className="game-more-links-content">
                                <img src="../../../public/Achiviements-removebg-preview.png" className="imageGames"/>
                                <h1>ACHIEVEMENTS</h1>
                            </div>
                        </div>
                    </Link>
                    <Link to={`/games/${id}/gameAdditions`} className="game-more-links">
                        <div >
                            <div className="game-more-links-content">
                                <img src="../../../public/Games_Image-removebg-preview.png" className="imageGames"/>
                                <h1>GAME ADDITIONS</h1>
                            </div>
                        </div>
                    </Link>
                    <Link to={`/games/${id}/gameSeries`} className="game-more-links">
                        <div>
                            <div className="game-more-links-content">
                                <img src="../../../public/Games_Image-removebg-preview.png" className="imageGames"/>
                                <h1>GAME SERIES</h1>
                            </div>
                        </div>
                    </Link>
                </div>

        </>
    )
}

