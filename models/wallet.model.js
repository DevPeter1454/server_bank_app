const mongoose = require('mongoose');
const walletSchema = mongoose.Schema({
    accountNumber: Number,
    walletName: {
        type: String,
        required: true,
    }, 
    walletBalance: Number,
    targetAmount: Number,
    walletDescription: String,
})

const wallet = mongoose.model('Wallets', walletSchema);

module.exports = wallet;
