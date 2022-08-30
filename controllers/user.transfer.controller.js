/*jshint esversion : 8 */
const transferModel = require('../models/transfer.model.js');
const userModel = require('../models/user.model.js');

const transfer = (req,res) =>{
     userModel.findOne({accountNumber: req.body.senderAccount}, (err, user) =>{
        if(err){
            res.json({
                message: 'Error in transferring',
                error: err.message,
            });
        }else{
            if(user){
                if(user.accountBalance >= req.body.amount){
                    userModel.findOne({accountNumber: req.body.recieverAccount}, (err, user) =>{
                        if(err){
                            res.json({
                                message: 'Error in transferring',
                                error: err.message,
                            });
                        }else{
                            if(user){
                                userModel.findOneAndUpdate({accountNumber: req.body.senderAccount}, {$inc: {accountBalance: -req.body.amount}}, (err, user) =>{
                                    if(err){
                                        res.json({
                                            message: 'Error in transferring',
                                            error: err.message,
                                        });
                                    }else{
                                        userModel.findOneAndUpdate({accountNumber: req.body.recieverAccount}, {$inc: {accountBalance: req.body.amount}}, (err, user) =>{
                                            if(err){
                                                res.json({
                                                    message: 'Error in transferring',
                                                    error: err.message,
                                                });
                                            }else{
                                                let transaction = new transferModel(req.body);
                                                transaction.save((err, transaction) =>{
                                                    if(err){
                                                        res.json({
                                                            message: 'Error in transferring',
                                                            error: err.message,
                                                        });
                                                    }else{
                                                        res.json({
                                                            message: 'Transfer successful',
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                       
                                    }
                                });
                            }else{
                                res.json({
                                    message: 'Error in transferring',
                                    error: 'Reciever account does not exist',
                                });
                            }
                        }
                    });
                }else{
                    res.json({
                        message: 'Error in transferring',
                        error: 'Sender account balance is insufficient',
                    });
                }
            }else{
                res.json({
                    message: 'Error in transferring',
                    error: 'Sender account does not exist',
                });
            }
            
        }
    });
};



const getTransferRecipients = (req, res) =>{
    userModel.findOne({accountNumber: req.params.accountNumber}, (err, user) =>{
        if(err){
            res.json({
                message: 'Error in getting transfer recipients',
                error: err.message,
            });
        }else{
            if(user){
                res.json({
                    message: 'Transfer recipients retrieved successfully',
                    user: user,
                });
            }else{
                res.json({
                    message: 'Error in getting transfer recipients',
                    error: 'Account number does not exist',
                });
            }
        }
    });
};

module.exports = {transfer, getTransferRecipients};