import express from 'express';
import userSchema from '../schema/userSchema';
const  router = express.Router();

router.get('/', (req, res) =>{
    userSchema.findOne({"email" : req.get("email")})
        .then(userData => {
            res.send(userData.bookings)
        })
        .catch(err => res.sendStatus(400))
 })
router.post('/',(req, res) =>{
    let booking = req.body
    let currentUser = req.get("email")
        userSchema.findOneAndUpdate({
            "email": currentUser
        }, {
            $push: {
                "bookings": booking
            }
        })
        .then(res.sendStatus(201))
        .catch(err => res.sendStatus(500))


})
module.exports = router