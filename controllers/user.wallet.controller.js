const walletModel = require('../models/wallet.model');
const userModel = require('../models/user.model');

const getUserWallet = (req, res) => {
    console.log('getUserWallet');
    console.log(req.body);
    let form = new walletModel(req.body);
    form.save((err, form) => {
        if(err){
            if(err.message.includes('duplicate key')){
                res.json({
                    message: 'Error in creating wallet',
                    error: 'Wallet already exists , change the Name',
                });
                console.log(err.message);
            }else if(err.message.includes('Wallets validation failed: walletName: Path `walletName` is required.')){
                res.json({
                    message: 'Error in creating wallet',
                    error: 'Wallet Name is required',
                });
                console.log(err.message);
            }else if(err.message.includes('Wallets validation failed: walletName: Wallet Name is not valid')){
                res.json({
                    message: 'Error in creating wallet',
                    error: 'Wallet Name is not valid',
                });
                console.log(err.message);
            }else if(err.message.includes('Wallets validation failed: targetAmount: Target Amount must be a number')){
                res.json({
                    message: 'Error in creating wallet',
                    error: 'Target Amount must be a number',
                });
                console.log(err.message);
            }else if(err.message.includes('Wallets validation failed: walletBalance: Wallet Balance must be a number')){
                res.json({
                    message: 'Error in creating wallet',
                    error: 'Wallet Balance must be a number',
                });
                console.log(err.message);
            }
            else{
                res.json({
                    message: 'Error in creating wallet',
                    error: err.message,
                });
                console.log(err.message);
            }
        }else{
            res.json({
                message: 'Wallet created successfully',
                wallet: form,
            });
        }
    });
};

const getWallet = (req, res) =>{
    walletModel.find({accountNumber: req.params.accountNumber}, (err, wallet) => {
        if(err){
            res.json({
                message: 'Error in getting wallet',
                error: err.message,
            });
            console.log(err.message);
        }else{
            res.json({
                message: 'Wallet fetched successfully',
                wallet: wallet,
            });
        }
    });
};

const fundWallet = (req, res) => {
    console.log(req.body);
    userModel.findOne({accountNumber: req.body.accountNumber}, (err, user) =>{
        if(err){
            res.json({
                message: 'Error in retrieving details',
                error: err.message,
            });
            console.log(err.message);
        }else{
            if(user){
                if(user.accountBalance >= req.body.fundAmount){
                    userModel.findOneAndUpdate({accountNumber: req.body.accountNumber}, {$inc: {accountBalance: -req.body.fundAmount}}, (err, user) =>{
                        if(err){
                            res.json({
                                message: 'Error in funding wallet',
                                error: err.message,
                            });
                            console.log(err.message);
                        }else{
                            walletModel.findById(req.body.id, (err, wallet) => {
                                if(err){
                                    res.json({
                                        message: 'Error in funding wallet',
                                        error: err.message,
                                    });
                                    console.log(err.message);
                                }else{
                                    if(wallet){
                                        if(parseInt(wallet.targetAmount) >= (parseInt(req.body.fundAmount) + parseInt(wallet.walletBalance))){
                                            
                                                walletModel.findByIdAndUpdate(req.body.id, {$inc: {walletBalance: req.body.fundAmount,}, new:true}, (err, wallet) => {
                                                     if(err){
                                                         res.json({
                                                             message: 'Error in funding wallet',
                                                             error: err.message,
                                                         });
                                                         console.log(err.message);
                                                     }else{
                                                         res.json({
                                                             message: 'Wallet funded successfully',
                                                             wallet: wallet,
                                                         });
                                                     }
                                                });
                                             
                                        }
                                        else{
                                            res.json({
                                                message: 'Error in funding wallet, you can not fund more than target balance',
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }); //deduct from user account
                }else{
                    res.json({
                        message: 'Error in funding wallet',
                        error: 'Insufficient balance in account',
                    });
                }
            }else{
                res.json(
                    {
                        message: 'User not found',
                    }
                )
            }
        }
    });
};


const deleteWallet = (req, res) => {
    walletModel.findByIdAndDelete(req.params.id, (err, wallet) => {
        if(err) {
            res.json({
                message: 'Error in deleting wallet',
                error: err.message,
            });
            console.log(err.message);
        }else{
            res.json({
                message: 'Wallet deleted successfully',
                // wallet: wallet,
            });
        }
    });
};

const withdrawFunds = (req, res) => {
    walletModel.findById(req.params.id, (err, wallet) => {
        if(err){
            res.json({
                message: 'Error in withdrawing funds',
                error: err.message,
            });
            console.log(err.message);
        }else{
            if(wallet){
                if(wallet.walletBalance > req.body.withdrawAmount){
                    walletModel.findByIdAndUpdate(req.params.id, {$inc: {walletBalance: -req.body.withdrawAmount}}, (err, wallet) => {
                        if(err){
                            res.json({
                                message: 'Error in withdrawing funds',
                                error: err.message,
                            });
                            console.log(err.message);
                        }else{
                            if(wallet){
                                userModel.findOneAndUpdate({accountNumber: req.body.accountNumber}, {$inc: {accountBalance: req.body.withdrawAmount}}, (err, user) => {
                                    if(err){
                                        res.json({
                                            message: 'Error in withdrawing funds',
                                            error: err.message,
                                        });
                                        console.log(err.message);
                                    }else{
                                        res.json({
                                            message: 'Funds withdrawn successfully',
                                            wallet: wallet,
                                        });
                                    }
                                });
                            }
                        }
                    })
                }else{
                    res.json({
                        message: 'Error in withdrawing funds',
                        error: 'Insufficient funds in wallet',
                    });
                }
            }
        }
    })
};


module.exports = {getUserWallet, getWallet, fundWallet, deleteWallet, withdrawFunds};


