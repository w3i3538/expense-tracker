const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const categories = require('./modules/categories')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/', home)

router.use('/users', authenticator, users) 



module.exports = router