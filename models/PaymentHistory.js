const mongoose = require('mongoose')

const paymentHistorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentType: {
        type: String,
        enum: ['escrow', 'subscription', 'featured_listing'],
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'successful', 'failed'],
        default: 'pending'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema)
