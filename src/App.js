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
      <nav>
        <div className={appStyles.icon}>
          <h1>LoL Tracker</h1>
        </div>
        <div className={appStyles.searchBar}>
          <form onSubmit={summ => searchUser(summ)}>
            <input className={appStyles.searchInput} type="text" onChange={(e) => setSummonerSearch(e.target.value)}value={summonerSearch} />
          </form>
        </div>
      </nav>
      <header>
        <img src={"http://ddragon.leagueoflegends.com/cdn/12.23.1/img/profileicon/" + summoner.profileIconId + ".png"} alt="Profile pic"></img>
        <h2>{summoner.name}</h2>
        <p>{summoner.summonerLevel}</p>
      </header>

      <section className={appStyles.overview}>
        <p>Gamemode</p>
        <p>Win/Loss</p>
        <p>KDA</p>
      </section>
      <section className={appStyles.recap}>
        <div>
          <h3>Highest Kills</h3>
        </div>
      </section>
    </div>
  )
}

export default App


/* {<header className={appStyles.header}>
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
      </div>} */