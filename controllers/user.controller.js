/*jshint esversion: 8*/
const cloudinary  = require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})


const userModel = require('../models/user.model');
const getLandingPage = (req, res) => {
    res.json({
        message: 'Welcome to the landing page'
    });
};
const registerUser = (req, res) => {
    console.log(req.body);
    let form = new userModel(req.body);
    form.save((err) => {
        if(err){
            if(err.message.includes('duplicate key')){
                res.json({
                    message: 'Error in registering user',
                    error: 'Email already exists',
                });
                console.log(err.message);
            }else if(err.message.includes('Users validation failed: email: Email Address is not valid')){
                res.json({
                    message: 'Error in registering user',
                    error: 'Email Address is not valid',
                });
                console.log(err.message);
            }else if(err.message.includes('Users validation failed: password: Password must be at least 6 characters long')){
                res.json({
                    message: 'Error in registering user',
                    error: 'Password must be at least 6 characters long',
                });
                console.log(err.message);
            }
            else{
                res.json({
                    message: 'Error in registering user',
                    error: err.message,
                });
                console.log(err.message);
            }
            
        }else{
            res.json({
                message: 'User registered successfully'
            });
        }
    });
};
const loginUser = (req, res) => {
    console.log(req.body);
    userModel.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.json({
                message: 'Error in logging in user',
                error: err.message,
            });
            console.log(err.message);
        }else{
            if(user){
                if(user.password === req.body.password){
                    res.json({
                        message: 'User logged in successfully',
                        user: user,
                    });
                }else{
                    res.json({
                        message: 'Error in logging in user',
                        error: 'Password is incorrect',
                    });
                }
            }else{
                res.json({
                    message: 'Error in logging in user',
                    error: 'Email is incorrect',
                });
            }
        }
    });
};

const fundUser= (req, res)=>{
    userModel.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.json({
                message: 'Error in funding user',
                error: err.message,
            });
            console.log(err.message);
        }else{
            userModel.findOneAndUpdate({email: req.body.email}, {$inc: {accountBalance: parseInt(req.body.amount)}}, {new: true}, (err, user) => {
                if(err){
                    res.json({
                        message: 'Error in funding user',
                        error: err.message,
                    });
                    console.log(err.message);
                }else{
                    res.json({
                        message: 'User funded successfully',
                        user: user,
                    });
                }
        });
    }});
};

const getUserRecord = (req, res) => {
    userModel.findOne({email: req.body.email},(err, user) => {
        if(err){
            res.json({
                message: 'Error in getting user record',
                error: err.message,
            });
            console.log(err.message);
        }else{
            res.json({
                message: 'User record retrieved successfully',
                user: user,
            });
        }
    });
};

const uploadFile = (req, res) => {
    // console.log(req.body.image);
    let myFile = req.body.image;
    var uploadStr = 'data:image/jpeg;base64,' + myFile;
    cloudinary.v2.uploader.upload(uploadStr, {
        
    }, (err,result)=>{
        if(err){
            // console.log('errorr');
            console.log(err);
            res.json({
                message: 'Error in uploading image',
            })
        }else{
            console.log(result);
            res.json({
                message: 'Image uploaded successfully',
                image: result.url,
            });
        }
    });
}

module.exports = {getLandingPage, registerUser, loginUser, fundUser, getUserRecord, uploadFile};