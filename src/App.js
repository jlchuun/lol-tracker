import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [summonerSearch, setSummonerSearch] = useState('')
  const [summoner, setSummoner] = useState({})
  const [matchHistory, setMatchHistory] = useState([])

  const searchUser = (e) => {
    e.preventDefault()
    axios
      .get(`/summoner/${summonerSearch}`)
      .then(response => setSummoner(response.data))
      .catch(error => console.log(error))

    axios
      .get(`/summoner/${summoner.name}/matches`)
      .then(response => setMatchHistory(response.data))
      .catch(error => console.log(error))

    console.log(matchHistory)
    setSummonerSearch('')
  }

  return (
    <div>
      <form onSubmit={summ => searchUser(summ)}>
        <input type="text" onChange={(e) => setSummonerSearch(e.target.value)}value={summonerSearch} />
      </form>
      {JSON.stringify(summoner) !== '{}' ? <p>{summoner.name}</p> : <p>No Player Data</p>} 
    </div>
  )
}

export default App