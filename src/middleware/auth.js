const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization')
        //console.log(token) 
        token = token.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET)
        console.log(decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens': token })
        
        if (!user) {
            console.log('User not found in auth')
            throw new Error()
        }
        
        req.token = token
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth