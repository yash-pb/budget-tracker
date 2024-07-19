// models/User.js
const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
    type: { 
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
module.exports = mongoose.model('Transaction', transactionSchema);


