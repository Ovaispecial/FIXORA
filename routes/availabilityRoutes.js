const router = require('express').Router()

const User = require('../models/User')

const authMiddleware = require('../middleware/authMiddleware')

router.put('/update-status', authMiddleware, async (req, res) => {

    try {

        const { availabilityStatus } = req.body

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            {
                availabilityStatus
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Availability updated successfully',
            user: updatedUser
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
