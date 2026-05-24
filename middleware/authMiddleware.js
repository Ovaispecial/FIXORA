const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    try {

        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({
                message: 'Access denied'
            })
        }

        const verified = jwt.verify(
            token,
            'fixora_secret_key'
        )

        req.user = verified

        next()

    } catch (error) {

        res.status(401).json({
            message: 'Invalid token'
        })

    }

}

module.exports = authMiddleware
