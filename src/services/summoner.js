import axios from 'axios'
const baseUrl = '/summoner'

const getSummoner = async (summonerName) => {
    const response  = await axios.get(`${baseUrl}/${summonerName}`)
    return response.data
}

export default { getSummoner }