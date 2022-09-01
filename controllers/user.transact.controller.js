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
    transactModel.find({}, (err, form) => {
        if(err){
            res.json({
                message: 'Error in getting transactions',
                error: err.message,
            });
        }else{
            if(form.length > 0){
                form.forEach(element => {
                    if(element.senderAccount == req.params.senderAccount){
                        allTransactions.push(element);
                    }else if(element.recieverAccount == req.params.recieverAccount){
                        allTransactions.push(element);
                    }
                });         
            }
            if(allTransactions.length > 0){
                res.json({
                    message: 'Transactions found',
                    transactions: allTransactions,
                });
            }else{
                res.json({
                    message: 'No transactions found',
                });
            }
        }
    });
    // transactModel.
};

module.exports = {transact, getTransactions};