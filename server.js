require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err))

const authRoutes = require('./routes/authRoutes')

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('FIXORA Backend Running Successfully')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
