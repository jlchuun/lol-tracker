const ModeStat = ({gamemode, matches, summonerName}) => {
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
            <p>{gamemode}</p>
            <p>{matches.length} Games Played</p>
            <p>{win} Wins / {loss} Losses</p>
        </div>
    )
}

export default ModeStat