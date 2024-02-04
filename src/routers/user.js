const express = require('express')
const User = require('../models/user')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')

const { sendVerificationEmail } = require('../emails/account.js')

const router = express.Router()

router.post('/user', async (req, res) => {
    
    delete req.body.email_verified
    delete req.body.tokens
    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        sendVerificationEmail(user.email, user.username, token)
        res.status(201).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/user/verification', auth, async (req, res) => {
    const user = req.user
    const token = req.token

    console.log(user)
    console.log(token)

    user.emailVerified = true
    user.save()
    
    res.send()
})

module.exports = router