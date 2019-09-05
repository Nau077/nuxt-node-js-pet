const express = require('express')
const admins = express.Router()
const cors = require('cors')
const adminsAuth = require('../controllers/admins-auth')
const authMiddleware = require('../middleware/admin-auth-middleware')

admins.use(cors())

admins.post('/register', adminsAuth.register)
admins.post('/login', adminsAuth.login)
admins.post('/refreshToken', adminsAuth.refreshTokens)

module.exports = admins
