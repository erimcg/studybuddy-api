const express = require('express')
const User = require('../models/user')
const mongoose = require('mongoose')
const { sendVerificationEmail } = require('../emails/account.js')

const router = express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)
    
    try {
        //await user.save()
        sendVerificationEmail(user.email, user.username)
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router