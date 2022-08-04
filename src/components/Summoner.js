import { useParams } from 'react-router-dom'
import axios from 'axios'
const token = process.env.REACT_APP_RIOT_KEY

const Summoner = () => {
    let params = useParams()
    console.log(token)
    axios
        .get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.summonerName}?api_key=${token}`)
        .then((response) => {
            console.log(response.data)
        })
    return (
        <div>
            <h1>{params.summonerName}</h1>
        </div>
    )
}

export default Summoner