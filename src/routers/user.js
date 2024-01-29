const express = require('express')

const router = express.Router()
process.stdout.write("setting up user router\n")

router.post('/user', (req, res) => {
    console.log(req.body)
    process.stdout.write('processing post /user\n')
    res.status(201).send(req.body)
})

module.exports = router