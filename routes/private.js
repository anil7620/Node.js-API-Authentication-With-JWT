const express = require('express')
const router = express()

const verify = require('../verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts:{
            title: 'Finally Logged in',
            Description: 'Great!!!'
        }
    })
})




module.exports = router;
