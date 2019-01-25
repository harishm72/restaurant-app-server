import express from 'express';
import userSchema from '../schema/userSchema';
const  router = express.Router();

router.get('/', (req, res) =>{
    userSchema.findOne({"userName" : req.get("userName")})
        .then(userData => {
            res.send(userData.bookings)
        })
        .catch(err => res.sendStatus(400).send("Invalid userId"))
 })
router.post('/',(req, res) =>{
    let booking = req.body
    let currentUser = req.get("userName")
        currentUser = "harish";
        console.log(booking)
        userSchema.findOneAndUpdate({
            "userName": currentUser
        }, {
            $push: {
                "bookings": booking
            }
        })
        .then(res.sendStatus(201))
        .catch(err => res.sendStatus(500).send(err))


})
module.exports = router