const express = require('express')

const router = express.Router()

router.post('/user', (req, res) => {
    console.log(req.body)

    res.status(201).send(req.body)
})

module.exports = router