// models/User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    created_at: { 
        type: Date,
        default: new Date()
    },
    updated_at: { 
        type: Date,
        default: new Date()
    }
});
module.exports = mongoose.model('User', userSchema);


