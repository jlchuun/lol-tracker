import React, { useState } from 'react'
import { 
  Outlet,
  useNavigate
} from 'react-router-dom'
import summonerService from './services/summoner'

const App = () => {
  let navigate = useNavigate()
  const [summonerSearch, setSummonerSearch] = useState('')

  const searchUser = (e) => {
    e.preventDefault()
    navigate("/summoner/" + summonerSearch)
    summonerService.getSummoner(summonerSearch)
    setSummonerSearch('')
  }

  return (
    <div>
      <form onSubmit={searchUser}>
        <input type="text" onChange={(e) => setSummonerSearch(e.target.value)}value={summonerSearch} />
      </form>
      <Outlet />
    </div>
  )
}

export default App