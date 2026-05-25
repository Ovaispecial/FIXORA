const router = require('express').Router()

const Block = require('../models/Block')

const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const { blockedUser } = req.body

        const block = new Block({

            blocker: req.user.id,
            blockedUser

        })

        await block.save()

        res.status(201).json({
            message: 'User blocked successfully',
            block
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/my-blocks', authMiddleware, async (req, res) => {

    try {

        const blocks = await Block.find({
            blocker: req.user.id
        }).populate('blockedUser', 'fullname email')

        res.status(200).json(blocks)

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
