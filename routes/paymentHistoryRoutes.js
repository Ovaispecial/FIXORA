const router = require('express').Router()

const PaymentHistory = require('../models/PaymentHistory')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            amount,
            paymentType,
            status
        } = req.body

        const payment = new PaymentHistory({

            user: req.user.id,
            amount,
            paymentType,
            status

        })

        await payment.save()

        res.status(201).json({
            message: 'Payment history created successfully',
            payment
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-payments', authMiddleware, async (req, res) => {

    try {

        const payments = await PaymentHistory.find({
            user: req.user.id
        })

        res.status(200).json(payments)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
