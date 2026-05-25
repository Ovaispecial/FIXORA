const router = require('express').Router()

const Favorite = require('../models/Favorite')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/save', authMiddleware, async (req, res) => {

    try {

        const { artisan } = req.body

        const favorite = new Favorite({

            user: req.user.id,
            artisan

        })

        await favorite.save()

        res.status(201).json({
            message: 'Artisan saved successfully',
            favorite
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-favorites', authMiddleware, async (req, res) => {

    try {

        const favorites = await Favorite.find({
            user: req.user.id
        }).populate('artisan', 'fullname email')

        res.status(200).json(favorites)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
