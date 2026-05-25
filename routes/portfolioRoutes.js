const router = require('express').Router()

const Portfolio = require('../models/Portfolio')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const {
            title,
            description,
            imageUrl
        } = req.body

        const portfolio = new Portfolio({

            artisan: req.user.id,
            title,
            description,
            imageUrl

        })

        await portfolio.save()

        res.status(201).json({
            message: 'Portfolio created successfully',
            portfolio
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/artisan/:artisanId', async (req, res) => {

    try {

        const portfolios = await Portfolio.find({
            artisan: req.params.artisanId
        })

        res.status(200).json(portfolios)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
