const express = require('express')

// npm install cors --save
const cors = require('cors');

const userRouter = require('./routers/user')

const app = express()


app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())
app.use(userRouter)

app.get('', (req, res) => {
    res.send("hello")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})