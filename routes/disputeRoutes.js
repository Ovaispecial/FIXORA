const router = require('express').Router()

const Dispute = require('../models/Dispute')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            job,
            against,
            reason
        } = req.body

        const newDispute = new Dispute({

            job,
            complainant: req.user.id,
            against,
            reason

        })

        await newDispute.save()

        res.status(201).json({
            message: 'Dispute created successfully',
            dispute: newDispute
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-disputes', authMiddleware, async (req, res) => {

    try {

        const disputes = await Dispute.find({
            complainant: req.user.id
        })
        .populate('against', 'fullname email')

        res.status(200).json(disputes)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
