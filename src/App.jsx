
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Home from './assets/components/home';
import Games from './assets/components/games.jsx';
import DetailsGame from './assets/components/detailsGame.jsx'; 
import GetDevelopmentTeam from './assets/components/gameDevelopmentTeam.jsx';
import GetGeneres from './assets/components/gameGeneres.jsx';
import '/src/App.css';
import '/src/assets/styles/Home.css'
import GetGeneresId from './assets/components/gameGeneresId.jsx';
import GameAchiviements from './assets/components/gameAchievements.jsx';
import GetAdditions from './assets/components/gameAdditioins.jsx';
import GameSeries from './assets/components/gameSeries.jsx';
import Creators from './assets/components/creators.jsx';
import CreatorsId from './assets/components/creatorsId.jsx';
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/" element={<Layout/>}>
              <Route path="games" element={<Games/>}/>
              <Route path="games/:id" element={<DetailsGame/>}/>
              <Route path="development-team/:id" element={<GetDevelopmentTeam/>}/>
              <Route path="generes" element={<GetGeneres/>}/>
              <Route path="generes/:id" element={<GetGeneresId/>}/>
              <Route path="games/:id/achiviements" element={<GameAchiviements/>}/>
              <Route path="games/:id/gameAdditions" element={<GetAdditions/>}/>
              <Route path="games/:id/gameSeries" element={<GameSeries/>}/>
              <Route path="creators" element={<Creators/>}/>
              <Route path="creators/:id" element={<CreatorsId/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

function Layout(){
  return(
    <div>
      <ul className='ul-app'>
        <li>
          <Link to="/" style={{textDecoration:'none', color: '#fff', fontSize:'20px'}}>HOME</Link>
        </li>
        <li>
          <Link to="games" style={{textDecoration:'none', color: '#fff', fontSize:'20px'}}>GAMES</Link>
        </li>
        <li>
          <Link to="generes" style={{textDecoration:'none', color: '#fff', fontSize:'20px'}}>GENERES</Link>
        </li>
        <li>
          <Link to="creators" style={{textDecoration:'none', color: '#fff', fontSize:'20px'}}>CREATORS</Link>
        </li>
      </ul>
      <Outlet/>
      <Footer/>
    </div>
  )

}

function Footer(){
  return(
    <>
      <footer className='footer'>
        <div className='footerDiv'>
            <h3 className='footerTitle'>BY FRANCISCO ROBLES</h3>
            <div className='footerInfo'>
              <p>E-Mail Address: <a className='links' href="mailto:franciroble03@gmail.com">franciroble03@gmail.com</a></p>
              <p>Instagram: <a className='links' href='https://www.instagram.com/r__francisss/'>r__francisss</a></p>
              <p>Linkedin: <a className='links' href='https://www.linkedin.com/in/franci-robles-58518b263/'>Franci Robles</a></p>
              <p>GitHub: <a className='links' href='https://github.com/RFrancisL'>RFrancisL</a></p>
            </div>
          </div>
          <div className='footeerDescription'>
            <div className='description'>
              <h3 className='footerTitleD'>DESCRIPTION</h3>
              <p>Web Aplication developed with React-JS for a personal project. 
                The reason of his develop its improve the personal experience
                with React-JS</p>
            </div>
          </div>
      </footer>
    </>

  )
}
export default App
