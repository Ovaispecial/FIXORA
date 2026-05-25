const router = require('express').Router()

const User = require('../models/User')

router.get('/artisans', async (req, res) => {

    try {

        const {
            category,
            availabilityStatus,
            skill
        } = req.query

        let query = {
            role: 'artisan'
        }

        if (category) {
            query.category = category
        }

        if (availabilityStatus) {
            query.availabilityStatus = availabilityStatus
        }

        if (skill) {
            query.skills = {
                $in: [skill]
            }
        }

        const artisans = await User.find(query)

        res.status(200).json(artisans)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
