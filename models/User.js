const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

 role: {
    type: String,
    enum: ['customer', 'artisan', 'admin'],
    default: 'customer'
},

availabilityStatus: {
    type: String,
    enum: ['online', 'offline', 'busy'],
    default: 'offline'
},
bio: {
    type: String,
    default: ''
},

skills: [{
    type: String
}],

experience: {
    type: Number,
    default: 0
},

category: {
    type: String,
    default: ''
}
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
