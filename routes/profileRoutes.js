const router = require('express').Router()

const User = require('../models/User')

const authMiddleware = require('../middleware/authMiddleware')

router.put('/update-profile', authMiddleware, async (req, res) => {

    try {

        const {
            bio,
            skills,
            experience,
            category
        } = req.body

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            {
                bio,
                skills,
                experience,
                category
            },

            {
                new: true
            }

        )

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
