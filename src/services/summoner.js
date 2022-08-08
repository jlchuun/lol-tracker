const axios = require('axios')
const baseUrl = '/summoner'


const getSummoner = async (summonerName) => {
    const response  = await axios.get(`${baseUrl}/${summonerName}`)
    let data = response.data
    return data
}



export default { getSummoner }