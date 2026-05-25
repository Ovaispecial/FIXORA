const router = require('express').Router()

const Job = require('../models/Job')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            budget,
            location
        } = req.body

        const newJob = new Job({

            customer: req.user.id,
            title,
            description,
            category,
            budget,
            location

        })

        await newJob.save()

        res.status(201).json({
            message: 'Job created successfully',
            job: newJob
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/', async (req, res) => {

    try {

        const jobs = await Job.find()
            .populate('customer', 'fullname email')

        res.status(200).json(jobs)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
