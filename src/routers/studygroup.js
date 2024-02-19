const express = require('express')
const auth = require('../middleware/auth')

const StudyGroup = require('../models/studygroup')

const router = express.Router()

router.post('/studygroup', auth, async (req, res) => {
    delete req.body.owner
    delete req.body.participants

    const user = req.user

    req.body.owner = req.user._id

    try {
        const group = new StudyGroup({
            ...req.body,
            host: user._id
        })

        await group.save()
        res.status(201).send()
    }
    catch (error) {
        console.log(error)
        res.status(400).send()
    }

})

module.exports = router
