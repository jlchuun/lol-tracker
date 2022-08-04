import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter,
  Routes,
  Route
 } from 'react-router-dom';
import App from './App'
import Summoner from './components/Summoner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="summoner/:summonerName" element={<Summoner />} />
      </Route>
    </Routes>
  </BrowserRouter>)