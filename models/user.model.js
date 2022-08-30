/*jshint esversion : 6 */

const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname: {
      type:  String,
      required: true,
      trim: true,
    },
    lastname:  {
        type:  String,
        required: true,
        trim: true,

      },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value)=>{
                const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Email Address is not valid',
        }


    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value)=>{
                return value.length >= 6;
            },
            message: 'Password must be at least 6 characters long',
        }
    },
    accountNumber: Number,
    accountBalance: Number,
    image: String,
});
const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;