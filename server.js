require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

console.log('SERVER UPDATED')

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('HOME WORKING')
})

app.get('/test', (req, res) => {
    res.send('TEST WORKING')
})

app.use('/api/auth', require('./routes/authRoutes'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
