const mongoose = require('mongoose')

const disputeSchema = new mongoose.Schema({

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },

    complainant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    against: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['open', 'resolved', 'rejected'],
        default: 'open'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Dispute', disputeSchema)
