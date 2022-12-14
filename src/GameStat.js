import Stats from "./Stats";
import appStyles from'./App.module.css'

const GameStat = ({matches, summonerName, stat}) => {
    let shownSummoner
    let shownStat

    let maxKills = 0
    let maxDeaths = 0
    let maxAssists = 0

    let leastKills = 1000
    let leastDeaths = 1000
    let leastAssists = 1000

    for (let i = 0; i < matches.length; i++) {
        const summonerIndex = matches[i].info.participants.map((participant =>  {
            return participant.summonerName
        })).indexOf(summonerName)
        let summoner = matches[i].info.participants[summonerIndex]
        console.log(summoner)
        
        switch (stat) {
            case Stats.MostKills:
                if (summoner.kills >= maxKills) {
                    shownSummoner = summoner
                    maxKills = summoner.kills 
                }
                shownStat = maxKills
                break;
            case Stats.LeastKills:
                if (summoner.kills <= leastKills) {
                    shownSummoner = summoner
                    leastKills = summoner.kills 
                }
                shownStat = leastKills
                break;
            case Stats.MostDeaths:
                if (summoner.deaths >= maxDeaths) {
                    shownSummoner = summoner
                    maxDeaths = summoner.deaths 
                }
                shownStat = maxDeaths
                break;
            case Stats.LeastDeaths:
                if (summoner.deaths <= leastDeaths) {
                    shownSummoner = summoner
                    leastDeaths = summoner.deaths 
                }
                shownStat = leastDeaths
                break;
            case Stats.MostAssists:
                if (summoner.assists >= maxAssists) {
                    shownSummoner = summoner
                    maxAssists = summoner.assists 
                }
                shownStat = maxAssists
                break;
            case Stats.LeastAssists:
                if (summoner.assists <= leastAssists) {
                    shownSummoner = summoner
                    leastAssists = summoner.assists 
                }
                shownStat = leastAssists
                break;
            default:
                break
        }
        
    }
    return (
        <div className={`${appStyles.gameStatCard}`}>
            {shownSummoner !== null ?
            <>
                <div className={`${appStyles.cardImage}`}>
                    <img src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${shownSummoner.championName.charAt(0).toUpperCase() + shownSummoner.championName.slice(1)}.png`}></img>
                </div>
            </> 
            : <></>}
            
            
        </div>
    )
}

export default GameStat