import mongoose from 'mongoose';

let restaurantSchema =  new mongoose.Schema({

})
const restaurant = module.exports = mongoose.model('restaurant', restaurantSchema)

module.exports.getrestaurants = (callback) =>{
    restaurant.find(callback)
}
