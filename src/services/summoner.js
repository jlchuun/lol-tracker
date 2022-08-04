const axios = require('axios')
const baseUrl = '/summoner'


const getSummoner = async (summonerName) => {
    const response  = await axios.get(`${baseUrl}/${summonerName}`)
    console.log(response.data)
    return response.data
}



export default { getSummoner }