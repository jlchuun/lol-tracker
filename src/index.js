import ReactDOM from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
 } from 'react-router-dom';
import App from './App'
import Summoner from './components/Summoner'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="summoner/:summonerName" element={<Summoner />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)