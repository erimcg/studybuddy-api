const express = require('express')

const router = express.Router()

router.post('/user', async (req, res) => {
    console.log(req.body)
    //res.status(201).send(req.body)
    res.send("post /user")
})

router.get('/user', (req, res) => {
    res.send("get /user")
})

module.exports = router