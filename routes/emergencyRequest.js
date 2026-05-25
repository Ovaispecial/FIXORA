const mongoose = require('mongoose')

const EmergencyRequest = require('../models/EmergencyRequest')
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed'],
        default: 'pending'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema)
