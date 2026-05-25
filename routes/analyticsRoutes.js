const router = require('express').Router()

const User = require('../models/User')
const Job = require('../models/Job')
const Dispute = require('../models/Dispute')
const EmergencyRequest = require('../models/EmergencyRequest')

const authMiddleware = require('../middleware/authMiddleware')

router.get('/stats', authMiddleware, async (req, res) => {

    try {

        const totalUsers = await User.countDocuments()

        const totalJobs = await Job.countDocuments()

        const totalDisputes = await Dispute.countDocuments()

        const totalEmergencyRequests = await EmergencyRequest.countDocuments()

        res.status(200).json({

            totalUsers,
            totalJobs,
            totalDisputes,
            totalEmergencyRequests

        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
