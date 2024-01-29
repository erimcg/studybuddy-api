const express = require('express')

const router = new express.Router()

router.post('/', async (req, res) => {
    console.log(req.body)
    res.status(201).send(req.body)
})

module.exports = router