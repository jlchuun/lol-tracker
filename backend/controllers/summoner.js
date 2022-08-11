require('dotenv').config()
const summonerRouter = require('express').Router()
const { default: matchers } = require('@testing-library/jest-dom/matchers')
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

summonerRouter.get('/:summonerName/matches', async (req, res) => {
    const puuid = await getSummPuuid(req.params.summonerName)

    const matchIDs = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${key}`
    )
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error))

    const matches = []

    for (let i = 0; i < matchIDs.length; i++) {
        let matchID = matchIDs[i]
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${key}`)
        .then(response => response.data)
        .catch(error => console.log(error))
        matches.push(matchData)
    }
    return res.json(matches)
})

module.exports = summonerRouter