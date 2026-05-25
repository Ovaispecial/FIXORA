const router = require('express').Router()

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/register', async (req, res) => {

    try {

        const {
            fullname,
            email,
            password,
            role
        } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {

            return res.status(400).json({
                error: 'User already exists'
            })

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({

            fullname,
            email,
            password: hashedPassword,
            role

        })

        await user.save()

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }

        )

        res.status(201).json({

            token,

            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }

        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.post('/login', async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body

        const user = await User.findOne({ email })

        if (!user) {

            return res.status(400).json({
                error: 'Invalid credentials'
            })

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {

            return res.status(400).json({
                error: 'Invalid credentials'
            })

        }

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }

        )

        res.status(200).json({

            token,

            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }

        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

module.exports = router
