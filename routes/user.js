import express from 'express';
import userSchema from '../schema/userSchema'
const  router = express.Router();

router.get('/:email', (req, res) =>{
   userSchema.findOne({email : req.params.email})
       .then(userData => {
           if(!userData){
            return res.send(false)
           }
           res.send(userData)
       })
       .catch(err => res.sendStatus(400).send("Invalid userId"))
})
router.post('/',(req, res) =>{

    let currentUser = req.body.email
    //console.log(req.body)
    userSchema.findOne({
        "email": currentUser
    })
    .then(data => {
        if (data !== null)
            return res.status(400).send(`exists`)
        else if (data === null){
        let model = new userSchema(req.body)
        model.save((err) => {
            if(err)return (err)
         return res.sendStatus(201)
        })
    }
    }).catch(err => res.sendStatus(500).send("error"))

})
router.post('/update', (req, res) =>{
    let currentUser = req.get('email')
    userSchema.findOneAndReplace({
        email: req.get('email')
    },
    {$set : {
            'displayName' : req.body.displayName,
            'phoneNumber' : req.body.phoneNumber,
            'paymentMode' : req.body.paymentMode   
        }
    },
    ).then(user => {
        return res.json(user)
    })
    .catch(err => res.send(err.message)) 
})
module.exports = router

