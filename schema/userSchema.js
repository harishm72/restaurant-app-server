import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    "userName": {
        type: String,
        required: true
    },
    "favourites": [],
    "bookings": [],
}, {
    versionKey: false
})

const user = module.exports = mongoose.model('user', userSchema)