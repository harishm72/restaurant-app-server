import express from 'express';
import userSchema from '../schema/userSchema'
const  router = express.Router();

router.get('/:id', (req, res) =>{
   userSchema.findById(req.params.id)
       .then(userData => {
           res.send(userData)
       })
       .catch(err => res.sendStatus(400).send("Invalid userId"))
})
router.post('/',(req, res) =>{

    let currentUser = req.body.userName 
    console.log(currentUser)
    userSchema.findOne({
        "userName": currentUser
    })
    .then(data => {
        if (data !== null)
            return res.status(400).send(`exists`)
        else if (data === null){
        let model = new userSchema(req.body)
        model.save((err) => {
            if(err)return (err)
         return res.sendStatus(201).send(`created`)
        })
    }
    }).catch(err => res.sendStatus(500).send("error"))

})
module.exports = router

