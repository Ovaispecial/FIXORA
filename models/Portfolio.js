const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({

    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        default: ''
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Portfolio', portfolioSchema)
