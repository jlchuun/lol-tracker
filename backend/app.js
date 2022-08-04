const express = require('express')
const cors = require('cors')
const app = express()
const summonerRouter = require('./controllers/summoner')
const middleware = require('./utils/middleware')



app.use(cors())
app.use(express.json())
app.use('/summoner', summonerRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app