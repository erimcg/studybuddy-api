const express = require('express')

const router = express.Router()

router.post('/user', async (req, res) => {
    console.log(req.body)
    let name = req.body.name
    //res.status(201).send(req.body)
    res.send("post /user" + name)
})

router.get('/user', (req, res) => {
    res.send("get /user")
})

module.exports = router