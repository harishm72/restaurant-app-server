import express from 'express';
import restaurantModel from '../schema/restaurantSchema';
const  router = express.Router();


router.get('/trending', (req, res) => {
    restaurantModel.find((err, restaurants) => {
        if (err) throw err;
        let start = Math.floor((Math.random() * 1170) + 1);
        let results = restaurants.map(restaurant => restaurant.toObject())
        res.send(results.slice(start, start+9))
    })
})

router.get('/:id', (req, res) =>{
    restaurantModel.findOne({ '_id': req.params.id.toString() }, (err, restaurant) => {
        if (err) throw err;
        res.send(restaurant)
    })
})
router.get('/search/:query', (req, res) =>{
    let searchString = req.params.query;
    let dbQuery = restaurantModel.find({
        '$or': [
            { name: { '$regex': searchString, '$options': 'i' } },
            { cuisines: { '$regex': searchString, '$options': 'i' } },
            { 'location.city': { '$regex': searchString, '$options': 'i' } },
            { 'location.locality': { '$regex': searchString, '$options': 'i' } }]
    })

    let promise = dbQuery.exec();
    promise.then(rest => res.send(rest))
        .catch(err => res.send(err))
})
module.exports = router