const router = require('express').Router()

const Job = require('../models/Job')

const authMiddleware = require('../middleware/authMiddleware')

router.put('/start/:jobId', authMiddleware, async (req, res) => {

    try {

        const updatedJob = await Job.findByIdAndUpdate(

            req.params.jobId,

            {
                status: 'in_progress'
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Job started successfully',
            job: updatedJob
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.put('/complete/:jobId', authMiddleware, async (req, res) => {

    try {

        const updatedJob = await Job.findByIdAndUpdate(

            req.params.jobId,

            {
                status: 'completed'
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Job completed successfully',
            job: updatedJob
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
