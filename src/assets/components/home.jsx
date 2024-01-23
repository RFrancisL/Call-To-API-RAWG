import { Link } from 'react-router-dom'
import '../styles/Home.css'
export default function Home(){
    return(
        <div className='divMegaGlobal'>
            <div className='divMegaSemiGlobal'>
                <h1 className='title-home'>WELCOME TO WORLD OF GAMES!</h1>
                <h3 className='description-home'>Embark on a thrilling journey into the heart of gaming excellence at World of Games!. 
                Our carefully curated selection showcases some of the best games from around the world, promising an exploration of creativity, 
                skill, and endless fun. Whether you are a seasoned gamer or just starting your gaming odyssey, World of Games is your gateway 
                to discovering titles that will captivate your imagination.</h3>
                <h3>Click below to start your gaming exploration and unlock a world of possibilities!</h3>
                <Link to="games"><button type='button' className='enter-btn'>Enter</button></Link>
            </div>
        </div>
    )
}