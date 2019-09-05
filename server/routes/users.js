const express = require('express')
const users = express.Router()
const cors = require('cors')
const usersAuth = require('../controllers/users-auth')
const mailHelper = require('../controllers/email-helpers/email-verification')
const authMiddleware = require('../middleware/users-auth-middleware')
// const usersCourses = require('../controllers/users-courses')

users.use(cors())

users.post('/register', usersAuth.register)
users.post('/login', usersAuth.login)
users.post('/refreshToken', usersAuth.refreshTokens)
users.get('/confirmation/:token', usersAuth.confirmEmail)
// users.get('checkCourses/:token', usersCourses.checkCourses)

module.exports = users
