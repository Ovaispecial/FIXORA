const router = require('express').Router()

const EmergencyRequest = require('../models/EmergencyRequest')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            category,
            description,
            location
        } = req.body

        const emergencyRequest = new EmergencyRequest({

            customer: req.user.id,
            category,
            description,
            location

        })

        await emergencyRequest.save()

        res.status(201).json({
            message: 'Emergency request created successfully',
            emergencyRequest
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/all', authMiddleware, async (req, res) => {

    try {

        const emergencyRequests = await EmergencyRequest.find()
            .populate('customer', 'fullname email')

        res.status(200).json(emergencyRequests)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
