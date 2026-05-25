const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    customer: {
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

    category: {
        type: String
    },

    budget: {
        type: String
    },

    location: {
        type: String
    },

status: {
    type: String,
    enum: ['open', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
}

}, {
    timestamps: true
})

module.exports = mongoose.model('Job', jobSchema)
