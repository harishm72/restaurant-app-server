import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    "displayName": {
        type: String,
        required: true
    },
    "email" :{
        type : String,
        required : true
    },
    "paymentMode" : "",
    "phone" : "",
    "photoURL" : "",
    "favourites": [],
    "bookings": [],
}, {
    versionKey: false
})

const user = module.exports = mongoose.model('user', userSchema)