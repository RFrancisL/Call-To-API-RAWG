import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import '../styles/gameComponents.css'

const keyApi = 'a6842c51b3af4630b6e44e79ae5ce11c'
const params = {
    key: keyApi,
}

const queryString = new URLSearchParams(params).toString()

export const Carousel = ({items, renderItem}) => {
    
    const [currentPosition, setCurrentPosition] = useState(0)

    const prevClick = () => {
        setCurrentPosition((prevPosition)=>(prevPosition > 0 ? prevPosition - 1 : 0))
    }

    const nextClick = () => {
        setCurrentPosition((nextPosition)=>(nextPosition < items.length - 1 ? nextPosition + 1 : nextPosition))
    }

    return (
        <div>
            <div>
                {renderItem(items[currentPosition])}
            </div>
            <div className="component-btn">
                <button onClick={prevClick} className="btn-prev" disabled={currentPosition === 0}> ⏪ </button>
                <button onClick={nextClick} className="btn-next" disabled={currentPosition === items.length - 1}>⏩</button>
            </div>
        </div>
    )
}

export function GetScreenshotsAndTrailers() {
    const { id } = useParams();
  
    const [screenshots, setScreenshots] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchScreenshots = fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?${queryString}`
      ).then((res) => res.json());
  
      const fetchTrailers = fetch(
        `https://api.rawg.io/api/games/${id}/movies?${queryString}`
      ).then((res) => res.json());
      
      {/*Promise.all para realizar las dos solicitudes de manera simultánea 
        y combinar los resultados antes de actualizar el estado*/}
      Promise.all([fetchScreenshots, fetchTrailers])
        .then(([screenshotsData, trailersData]) => {
          setScreenshots(screenshotsData.results);
          setTrailers(trailersData.results);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <h1>LOADING...</h1>;
    }
  
    if (error) {
      return <h1>{error}</h1>;
    }
  
    const combinedItems = [...screenshots, ...trailers];
  
    return (
      <Carousel
        items={combinedItems}
        renderItem={(item) => (
          item && (
            <div key={item.id}>
              {item.image && (
                <img
                  src={item.image}
                  alt={`Screenshot or Trailer ${item.id}`}
                  style={{ width: "350px" }}
                />
              )}
              {item.data && (
                <iframe
                  title={`Trailer for ${item.name}`}
                  width="350px"
                  height="200px"
                  src={item.data.max}
                  allowFullScreen
                  style={{ borderRadius: "30px" }}
                />
              )}
            </div>
          )
        )}
      />
    );
  }
  