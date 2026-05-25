const router = require('express').Router()

const Report = require('../models/Report')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            reportedUser,
            reason
        } = req.body

        const report = new Report({

            reporter: req.user.id,
            reportedUser,
            reason

        })

        await report.save()

        res.status(201).json({
            message: 'Report submitted successfully',
            report
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/all', authMiddleware, async (req, res) => {

    try {

        const reports = await Report.find()
            .populate('reporter', 'fullname email')
            .populate('reportedUser', 'fullname email')

        res.status(200).json(reports)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
