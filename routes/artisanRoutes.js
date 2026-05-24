const router = require('express').Router()

const ArtisanProfile = require('../models/ArtisanProfile')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            profession,
            bio,
            skills,
            location,
            pricing,
            experience
        } = req.body

        const newProfile = new ArtisanProfile({

            user: req.user.id,
            profession,
            bio,
            skills,
            location,
            pricing,
            experience

        })

        await newProfile.save()

        res.status(201).json({
            message: 'Artisan profile created successfully',
            profile: newProfile
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
