import React, { useEffect, useState } from 'react'
import appStyles from './App.module.css'
import axios from 'axios'
import GameStat from './GameStat.js'
import Winrate from './Winrate.js'
import Stats from './Stats'

const App = () => {
  const [summonerSearch, setSummonerSearch] = useState('')
  const [summoner, setSummoner] = useState({})
  const [aramHistory, setAramHistory] = useState([])


  const searchUser = (e) => {
    e.preventDefault()
    axios
      .get(`/summoner/${summonerSearch}`)
      .then(response => setSummoner(response.data))
      .catch(error => console.log(error))

    axios
      .get(`/summoner/${summonerSearch}/matches/aram`)
      .then(response => {
        setAramHistory(response.data)
      })
      .catch(error => console.log(error)) 
    setSummonerSearch('')
  }

  useEffect(() => {
    document.title = 'ARAM Recap'
  }, [])

  return (
    <div className={appStyles.container}>
      <nav>
        <div className={appStyles.icon}>
          <h1>ARAM Recap</h1>
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
        <Winrate matches={aramHistory} summonerName={summoner.name} />
        
      </header>
      <div className={appStyles.recapContainer}>
        <section className={appStyles.recapGrid}>
        {aramHistory.length > 0 ?
          <>
      
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.MostKills}/>
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.LeastKills}/>
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.MostDeaths}/>
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.LeastDeaths}/>
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.MostAssists}/>
            <GameStat matches={aramHistory} summonerName={summoner.name} stat={Stats.LeastAssists}/>
          </>
          :
          <>Loading Recap</>}
        </section>
      </div>
      
      </div>
  )
}

export default App