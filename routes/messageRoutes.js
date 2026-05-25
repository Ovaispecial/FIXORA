const router = require('express').Router()

const Message = require('../models/Message')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/send', authMiddleware, async (req, res) => {

    try {

        const {
            receiver,
            job,
            message,
            messageType
        } = req.body

        const newMessage = new Message({

            sender: req.user.id,
            receiver,
            job,
            message,
            messageType

        })

        await newMessage.save()

        res.status(201).json({
            message: 'Message sent successfully',
            chat: newMessage
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/conversation/:jobId', authMiddleware, async (req, res) => {

    try {

        const messages = await Message.find({
            job: req.params.jobId
        })
        .populate('sender', 'fullname email')
        .populate('receiver', 'fullname email')

        res.status(200).json(messages)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
