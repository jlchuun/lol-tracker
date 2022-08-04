require('dotenv').config()
const summonerRouter = require('express').Router()
const axios = require('axios')


let key = process.env.RIOT_KEY
let summonerInfo = null
summonerRouter.get('/:summonerName', (request, response) => {
    console.log(key)
    axios.get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${request.params.summonerName}?api_key=${key}`
    )
    .then(response => {
        summonerInfo = response.data
        console.log(response.data)
    })
    .catch(error => {
        console.log(error.message, 'test')
    })
    response.json(summonerInfo)
})

module.exports = summonerRouter