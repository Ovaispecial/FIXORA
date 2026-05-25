const router = require('express').Router()

const User = require('../models/User')
const Job = require('../models/Job')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/users', authMiddleware, async (req, res) => {

    try {

        const users = await User.find()

        res.status(200).json(users)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/jobs', authMiddleware, async (req, res) => {

    try {

        const jobs = await Job.find()

        res.status(200).json(jobs)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
