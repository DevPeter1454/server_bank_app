const transactModel = require('../models/transfer.model');


const transact = (req, res) => {
    let form = new transactModel(req.body);
    form.save((err, form) => {
        if(err){
        res.json({
            message: 'Error in saving transaction',
            error: err.message,
        });
        }else{
            res.json({
                message: 'Transaction saved successfully',
                // transaction: form,
            });
        }
    });
};


const getTransactions = (req, res) => {
    let allTransactions = [];
    transactModel.find({senderAccount: req.body.senderAccount}, (err, form) => {
        if(err){
            res.json({
                message: 'Error in getting transactions',
                error: err.message,
            });
        }else{
            if(form.length > 0){
                form.forEach(element => {
                    allTransactions.push(element);
                });
                // res.json({
                //     message: 'Transactions found',
                //     transactions: allTransactions,
                // });
            }
           transactModel.find({recieverAccount: req.body.receiverAccount}, (err, form) => {
                if(err){
                    res.json({
                        message: 'Error in getting transactions',
                        error: err.message,
                    });
                }else{
                    if(form.length > 0){
                        form.forEach(element => {
                            allTransactions.push(element);
                        });
                        
                    }
                }
           });
           res.json({
            message: 'Transactions found',
            transactions: allTransactions,
        });
        }
    });
    // transactModel.
};

module.exports = {transact, getTransactions};