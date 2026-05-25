const router = require('express').Router()

const Review = require('../models/Review')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            artisan,
            job,
            rating,
            comment
        } = req.body

        const newReview = new Review({

            artisan,
            customer: req.user.id,
            job,
            rating,
            comment

        })

        await newReview.save()

        res.status(201).json({
            message: 'Review submitted successfully',
            review: newReview
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/artisan/:artisanId', async (req, res) => {

    try {

        const reviews = await Review.find({
            artisan: req.params.artisanId
        })
        .populate('customer', 'fullname email')

        res.status(200).json(reviews)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
