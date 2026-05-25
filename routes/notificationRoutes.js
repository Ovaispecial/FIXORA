const router = require('express').Router()

const Notification = require('../models/Notification')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            user,
            title,
            message
        } = req.body

        const newNotification = new Notification({

            user,
            title,
            message

        })

        await newNotification.save()

        res.status(201).json({
            message: 'Notification created',
            notification: newNotification
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-notifications', authMiddleware, async (req, res) => {

    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 })

        res.status(200).json(notifications)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
