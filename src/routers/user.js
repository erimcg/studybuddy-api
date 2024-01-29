const express = require('express')

const router = express.Router()

router.get('/user', (req, res) => {
    //console.log(req.body)
    //res.status(201).send(req.body)
    res.send("get /user")
})

module.exports = router