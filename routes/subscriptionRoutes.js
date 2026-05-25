const router = require('express').Router()

const Subscription = require('../models/Subscription')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            plan,
            endDate
        } = req.body

        const subscription = new Subscription({

            user: req.user.id,
            plan,
            endDate

        })

        await subscription.save()

        res.status(201).json({
            message: 'Subscription created successfully',
            subscription
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-subscription', authMiddleware, async (req, res) => {

    try {

        const subscription = await Subscription.findOne({
            user: req.user.id
        })

        res.status(200).json(subscription)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
