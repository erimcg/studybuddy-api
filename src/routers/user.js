const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router