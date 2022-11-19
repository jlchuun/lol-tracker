import React, { useEffect, useState } from 'react'
import appStyles from './App.module.css'
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
      .get(`/summoner/${summonerSearch}/matches`)
      .then(response => setMatchHistory(response.data))
      .catch(error => console.log(error))

    console.log(matchHistory)
    setSummonerSearch('')
  }

  useEffect(() => {
    document.title = 'LoL Tracker'
  }, [])

  return (
    <div className={appStyles.container}>
      <header className={appStyles.header}>
        <h1>LoL Tracker</h1>
        <form onSubmit={summ => searchUser(summ)}>
          <input type="text" onChange={(e) => setSummonerSearch(e.target.value)}value={summonerSearch} />
        </form>
        {JSON.stringify(summoner) !== '{}' ? <p>{summoner.name}</p> : <p>No Player Data</p>} 
      </header>

      <div className={appStyles.matchHistory}>
        {matchHistory.length !== 0 ? 
          <>
          {matchHistory.map((matchInfo) => 
            <>
              <div className={appStyles.match}>
                {matchInfo.info.participants.map((data) => 
                  <p>{data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>
                )}
              </div>
            </>)}
          </>
          :
          <></>
        }
      </div>
      
    </div>
  )
}

export default App