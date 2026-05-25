const router = require('express').Router()

const Bid = require('../models/Bid')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create/:jobId', authMiddleware, async (req, res) => {

    try {

        const { amount, message } = req.body

        const newBid = new Bid({

            job: req.params.jobId,
            artisan: req.user.id,
            amount,
            message

        })

        await newBid.save()

        res.status(201).json({
            message: 'Bid submitted successfully',
            bid: newBid
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/job/:jobId', async (req, res) => {

    try {

        const bids = await Bid.find({
            job: req.params.jobId
        })
        .populate('artisan', 'fullname email')

        res.status(200).json(bids)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})
router.put('/accept/:bidId', authMiddleware, async (req, res) => {

    try {

        const updatedBid = await Bid.findByIdAndUpdate(

            req.params.bidId,

            {
                status: 'accepted'
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Bid accepted successfully',
            bid: updatedBid
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})
router.put('/reject/:bidId', authMiddleware, async (req, res) => {

    try {

        const updatedBid = await Bid.findByIdAndUpdate(

            req.params.bidId,

            {
                status: 'rejected'
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Bid rejected successfully',
            bid: updatedBid
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})
module.exports = router
