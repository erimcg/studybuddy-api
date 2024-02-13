const express = require('express')
const User = require('../models/user')
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

    user.email_verified = true
    user.save()
    
    res.send()
})

router.post('/user/login', async (req, res) => {
    try {
        console.log(req.body.email)
        console.log(req.body.password)

        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)

        if (user.email_verified === false) {
            res.status(401).send("Email has not been verified.")
        }
        else {
            const token = await user.generateAuthToken()
            res.status(200).send({ user, token })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router