/*jshint esversion :8 */
const mongoose = require('mongoose');

let transferSchema = mongoose.Schema({
    senderAccount : Number,
    recieverAccount : Number,
    amount: Number,
    date:Number,
    type:String,
    reference:String,
});

let transferModel = mongoose.model("transactions", transferSchema);


module.exports = transferModel;