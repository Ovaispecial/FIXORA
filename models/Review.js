const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)
