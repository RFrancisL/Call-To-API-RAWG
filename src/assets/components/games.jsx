import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom"; // Corrige la importación aquí
import '../styles/characters.css';


const apiKey = 'a6842c51b3af4630b6e44e79ae5ce11c';
const apiUrl = 'https://api.rawg.io/api/games';


const params = {
    key: apiKey,
};

const queryString = new URLSearchParams(params).toString();
const fullUrl = `${apiUrl}?${queryString}`;

export const INIT = {
    data: [],
    isLoading: false,
    error: ''
}
export function reducer(state, acction){
    if(acction.type === 'success'){
        return {data: acction.payload, isLoading: false, error:''}
    }

    if(acction.type === 'loading'){
        return {data: [], isLoading: acction.payload, error: ''}
    }

    if(acction.type === 'error'){
        return {data: [], isLoading: false, error: acction.payload}
    }

    return state
}

function useFetchDataGames(){
    const [state, dispatch] = useReducer(reducer, INIT)

    useEffect(()=>{
        dispatch({
            type: 'loading',
            payload: true
        })

        fetch(fullUrl)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching Error')
                }
                return res.json()
            })
            .then((data)=>{
                dispatch({
                    type:'success',
                    payload: data.results
                })
            })
            .catch((err)=>{
                dispatch({
                    type: 'error',
                    payload: err.message
                })
            })
    },[])

    return state
}  

export default function Games(){
    const {data, isLoading, error} = useFetchDataGames()

    if(isLoading){
        return <h1 style={{color:'#fff', textAlign:'center'}}>LOADING...</h1>
    }

    if(error){
        return <h1 style={{color:'#fff', textAlign:'center'}}>Something is wrong! 😢: {error}</h1>
    }

    return (
        <div>
            <div className="divgameGlobal">    
                <div className="game-principal-title">
                    <div className="image-title-game">
                        <h1 id="title">GAMES</h1>
                        <img id="image" src="../../../public/Game room neon.jpg" className="image-neon"/>
                    </div>
                    <div className="game-descriptionPage"> 
                        <h3 id="description">SOME OF THE BEST GAMES OF THE WORLD, RIGHT HERE!!!.
                            YOU WILL FIND: Comprehensive video game data: descriptions, 
                            generes, release dates, ESRB-ratings, average playtime, Metacritic ratings, 
                            official websites, DLCs and franchises.
                        </h3>
                    </div>
                </div>
                <div className="charactersGlobal">
                    {data.map((games) => {
                        return (
                            <>
                                <Link to={`/games/${games.id}`} style={{textDecoration:'none', listStyle:'none', color: '#fff'}}>
                                    <div key={games.id} className="characters">
                                        <img src={games.background_image} className="game-imageBackground"/>
                                        <h1 className="characterTitle">{games.name}</h1>
                                        <h3>Rating: {games.rating}⭐⭐⭐</h3>
                                        <h3>Released: {games.released}</h3>                                
                                    </div>
                                </Link>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
      );
}

