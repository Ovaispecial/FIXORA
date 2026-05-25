const router = require('express').Router()

const Payment = require('../models/Payment')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            artisan,
            job,
            amount
        } = req.body

        const newPayment = new Payment({

            customer: req.user.id,
            artisan,
            job,
            amount,
            status: 'held'

        })

        await newPayment.save()

        res.status(201).json({
            message: 'Escrow payment created',
            payment: newPayment
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.put('/release/:paymentId', authMiddleware, async (req, res) => {

    try {

        const updatedPayment = await Payment.findByIdAndUpdate(

            req.params.paymentId,

            {
                status: 'released'
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Payment released successfully',
            payment: updatedPayment
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
