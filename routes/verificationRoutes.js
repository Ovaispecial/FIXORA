const router = require('express').Router()

const Verification = require('../models/Verification')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/submit', authMiddleware, async (req, res) => {

    try {

        const {
            documentType,
            documentNumber
        } = req.body

        const verification = new Verification({

            user: req.user.id,
            documentType,
            documentNumber

        })

        await verification.save()

        res.status(201).json({
            message: 'Verification submitted successfully',
            verification
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-verification', authMiddleware, async (req, res) => {

    try {

        const verification = await Verification.findOne({
            user: req.user.id
        })

        res.status(200).json(verification)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
