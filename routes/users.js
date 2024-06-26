const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')


//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err)
            }
        }

        //now, I'll update the actual user, and it's gonna automatically set all inputs inside the req.body
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body,})
            res.status(200).json("Account has been successfully updated!")
        } catch(err) {
            return res.status(500).json(err)
        }
    
        //if the user try to update his password, generate the password again
    } else {
        return res.status(403).json('You can only update your account!')
    }
})




//delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been successfully deleted!")
        } catch(err) {
            return res.status(500).json(err)
        }
    
        //if the user try to update his password, generate the password again
    } else {
        return res.status(403).json('You can only delete  your account!')
    }
})



//get a user
router.get('/:id', async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        const {password,updatesAt, ...other} = user._doc
        res.status(200).json(other)
    } catch(err) {
        return res.status(500).json(err)
    }
})


//follow a user
//unfollow a user



module.exports = router