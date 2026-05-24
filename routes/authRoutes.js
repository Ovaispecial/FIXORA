const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/test', (req, res) => {
    res.json({ message: 'Auth Route Working' })
})

router.post('/register', async (req, res) => {

    try {

        const { fullname, email, password, role } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            'fixora_secret_key',
            {
                expiresIn: '7d'
            }
        )

        res.status(200).json({
            message: 'Login successful',
            token,
            user
        })

    } catch (error) {

        res.status(500).json({
            error: error.message
        })

    }

})

router.get('/profile', authMiddleware, async (req, res) => {

    res.json({
        message: 'Protected profile route',
        user: req.user
    })

})

module.exports = router
