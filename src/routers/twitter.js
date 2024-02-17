const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/twitter/send-tweet', auth, async (req, res) => {
    const user = req.user
    console.log(req.body)

    const OAUTH2_CLIENT_ID = req.body.OAUTH2_CLIENT_ID
    const auth_code = req.body.auth_code
    let text = req.body.text
    text ??= "Something strange happended. :)"

    const access_token = await getAccessToken(OAUTH2_CLIENT_ID, auth_code)

    if (access_token) {
        console.log('have access token')
        console.log(access_token)
        console.log("calling postTweet")

        if (postTweet(access_token, text)) {
            console.log('sending response status 201')
            res.status(201).send()
            return
        }
        else {
            console.log('sending response status 400')
            res.status(400).send()
            return
        }
    }

    console.log('sending response status 400*')
    res.status(400).send()
})

async function getAccessToken(OAUTH2_CLIENT_ID, auth_code) {
    console.log("client id: " + OAUTH2_CLIENT_ID)
    console.log("auth_code: " + auth_code)

    const details = {
        'grant_type': 'authorization_code',
        'client_id': OAUTH2_CLIENT_ID,
        'redirect_uri': 'https://n0code.net/work/teaching/courses/csci430/studybuddy/twitter-redirect.html',
        'code_verifier': 'challenge',
        'code': auth_code
    }

    console.log(details)

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody)

    const url = `https://api.twitter.com/2/oauth2/token`

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
    }

    let response = await fetch(url, options)
    console.log("fetch twitter auth token: " + response.status)
    const obj = await response.json()
    console.log(obj)

    if (response.status === 200) {
        return obj.access_token
    }
    else {
        return null
    }

}

async function postTweet(access_token, text) {

    console.log('access_token:' + access_token)

    const url = `https://api.twitter.com/2/tweets`

    const data = {
        text
    }

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }

    console.log("posting tweet")
    let response = await fetch(url, options)

    console.log("response from twitter")
    const obj = await response.json()
    console.log(obj)

    if (response.status === 201) {
        console.log("tweet successful")
        return true
    }
    else {
        console.log("error sending tweet")
        return false
    }
}

module.exports = router