/*jshint esversion : 8*/
const express = require('express');
const router = express.Router();
const {getLandingPage, registerUser, loginUser, fundUser, getUserRecord, uploadFile} = require('../controllers/user.controller');
const {transfer, getTransferRecipients} = require('../controllers/user.transfer.controller');
const {getUserWallet, getWallet, fundWallet, deleteWallet, withdrawFunds} = require('../controllers/user.wallet.controller');
const {transact, getTransactions}= require('../controllers/user.transact.controller');
router.get('/', getLandingPage);
router.post('/signup', registerUser);
router.post('/signin',loginUser);
router.post('/pay/fund',fundUser);
router.post('/getUser',getUserRecord);
router.post('/upload', uploadFile);
router.post('/transfer', transfer);
router.get('/transfer/recipients/:accountNumber', getTransferRecipients);
router.post('/wallet/create', getUserWallet);
router.get('/wallet/:accountNumber', getWallet);
router.post('/wallet/fund', fundWallet );
router.get('/wallet/delete/:id', deleteWallet);
router.post('create/transaction', transact);
router.get('/get/transactions/:senderAccount/:recieverAccount', getTransactions);
router.post('/wallet/withdraw', withdrawFunds);

module.exports = router;
