const router = require('express').Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')
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

module.exports = router
