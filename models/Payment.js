const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

    amount: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'held', 'released'],
        default: 'pending'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)
