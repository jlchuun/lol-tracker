import appStyles from './App.module.css'

const Winrate = ({gamemode, matches, summonerName}) => {
    let win = 0
    let loss = 0
    for (let i = 0; i < matches.length; i++) {
        const summoner = matches[i].info.participants.map((participant =>  {
            return participant.summonerName
        })).indexOf(summonerName)
        if (matches[i].info.participants[summoner].win) {
            win++
        } else {
            loss++
        }
    }

    return (
        <div>
            <p>{matches.length} Games Played</p>
            <div className={appStyles.winLossBar}>
                <div style={{width: win/(win+loss)*100 + "%"}} className={appStyles.wins}></div>
                <div className={appStyles.losses}></div>
            </div>
            <p>{win} Wins / {loss} Losses</p>
        </div>
    )
}

export default Winrate