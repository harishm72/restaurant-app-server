import express from 'express';
import mongoose from 'mongoose';
import  bodyParser from 'body-parser';

import restaurants from '../schema/restaurantSchema'

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/zomatoProject', {useMongoClient: true})

app.get('/api/restaurants/trending', (req, res) => {
    restaurants.find((err, restaurants) => {
        if (err) throw err;
        let results = restaurants.map(restaurant => restaurant.toObject())
        results = results.sort((a, b) =>
            (a['user_rating']['aggregate_rating'] < b['user_rating']['aggregate_rating']) ? 1 :
                ((b['user_rating']['aggregate_rating'] < a['user_rating']['aggregate_rating']) ? -1 : 0));
        res.send(results.slice(0, 10))
    })
})

app.get('/api/restaurants/:id', (req, res) =>{
    restaurants.findOne({ 'id': req.params.id.toString() }, (err, restaurant) => {
        if (err) throw err;
        res.send(restaurant)
    })
})
app.get('/api/restaurants/search/:query', (req, res) =>{
    let searchString = req.params.query;
    restaurants.find({
        '$or': [
            { name: { '$regex': searchString, '$options': 'i' } },
            { cuisines: { '$regex': searchString, '$options': 'i' } },
            { 'location.city': { '$regex': searchString, '$options': 'i' } },
            { 'location.locality': { '$regex': searchString, '$options': 'i' } }]
    }, (err, rest) => {
        if (err) throw err;
        res.send(rest)
    })

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}, bcoz client wants to use port 3000.`))