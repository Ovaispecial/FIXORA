const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },

    message: {
        type: String,
        required: true
    },

    messageType: {
        type: String,
        enum: ['text', 'image', 'voice', 'quotation'],
        default: 'text'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)
