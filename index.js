const express = require('express')
const cors = require('cors')
const router = require('./router')
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.get('/', (request, response) => {
    response.status(200)
    response.send("Hello student!")
}) 


app.listen(4000)