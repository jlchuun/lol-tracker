require('dotenv').config()
const summonerRouter = require('express').Router()
const axios = require('axios')

let key = process.env.RIOT_KEY

const getSummPuuid = (summName) => {
    return axios.get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summName}?api_key=${key}`)
        .then(response => {
            return response.data.puuid
        })
        .catch(error => console.log(error)) 
}

summonerRouter.get('/:summonerName', (req, res) => {
    axios.get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}?api_key=${key}`
    )
    .then(response => {
        console.log(response.data)
        return res.json(response.data)
    })
    .catch(error => {
        console.log(error.message)
    })
})

// get last 1000 matches
summonerRouter.get('/:summonerName/matches/:gamemode', async (req, res) => {
    const puuid = await getSummPuuid(req.params.summonerName)
    const matchIDs = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${key}`
    )
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error))

    const aram = []
    const ranked = []
    const normal = []

    for (let i = 0; i < matchIDs.length; i++) {
        let matchID = matchIDs[i]
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${key}`)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error))

        if (matchData.info.queueId == 420 || matchData.info.queueId == 440) {
            ranked.push(matchData)
        } else if (matchData.info.queueId == 450) {
            aram.push(matchData)
        } else if(matchData.info.queueId == 400 || matchData.info.queueId == 430) {
            normal.push(matchData)
        }
    }
    if (req.params.gamemode === 'ranked') {
        return res.json(ranked)
    } else if (req.params.gamemode === 'aram') {
        return res.json(aram)
    } else if (req.params.gamemode === 'normal') {
        return res.json(normal)
    }
})

module.exports = summonerRouter