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
app.use('/api/artisans', require('./routes/artisanRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/bids', require('./routes/bidRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))
app.use('/api/reviews', require('./routes/reviewRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))
app.use('/api/disputes', require('./routes/disputeRoutes'))
app.use('/api/favorites', require('./routes/favoriteRoutes'))
app.use('/api/verifications', require('./routes/verificationRoutes'))
app.use('/api/emergencies', require('./routes/emergencyRoutes'))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
