const mongoose = require('mongoose')

const artisanProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    profession: {
        type: String,
        required: true
    },

    bio: {
        type: String
    },

    skills: {
        type: [String]
    },

    location: {
        type: String
    },

    pricing: {
        type: String
    },

    experience: {
        type: String
    },

    verified: {
        type: Boolean,
        default: false
    },

    rating: {
        type: Number,
        default: 0
    },

    portfolioImages: {
        type: [String]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model(
    'ArtisanProfile',
    artisanProfileSchema
)
