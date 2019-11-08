const User = require('../models/User')
const Token = require('../models/user-token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authHelper = require('./tokensHelpers/users-tokens-helper')
const config = require('../config/config')
const sendEmail = require('./email-helpers/email-verification')
const { secret } = require ('../config/config').jwtEmail


const jwtSecret = process.env.SECRET_KEY = config.jwt.secret

const updateTokens = (payload, res) => {
	const accessToken = authHelper.generateAccessToken(payload)
	const refreshToken = authHelper.generateRefreshToken(payload)
	authHelper.replaceDbRefreshToken(refreshToken.id, payload._id)
	res.status(200).json({
		accessToken,
		refreshToken: refreshToken.token,
		message: 'token has been updated'
	})
}
const register = (req, res) => {
	const today = new Date()
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		curse: req.body.curse,
		created: today
	}
      
	User.findOne({
		email: req.body.email
	})
		.then(user => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash       
					User.create(userData)
						.then(user => {                                  
							res.status(200).json({ status: user.email + ' registered' })
							return user
						})
						.then(user => {
							sendEmail.sendEmail(user)
						})
						.catch(err => {
							res.status(401).json('error: ' + err)
						})
				})
			} else {
				res.json({ error: 'User already exists' })
			}
		})
		.catch(err => {
			res.status(500).send('error: ' + err)
		})
} 

const login = async (req, res) => {
	const user = await User.findOne({
		email: req.body.email
	})
	if (!user) {
		res.status(401).json({ error: 'User does not exist' })
		return
	}
	else if (!bcrypt.compareSync(req.body.password, user.password)) {
		res.status(401).json({ error: 'Incorrect password' })
		return
	}
	else if (!user.confirmed) {
		res.status(401).json({ error: 'User does not confirm email' })
		return
	}
              
	const payload = {
		_id: user._id,
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email
	}
	updateTokens(payload, res)  
}


const refreshTokens = (req, res) => {
	const { refreshToken } = req.body
	let payload
	try {
		payload = jwt.verify(refreshToken, secret)
		if (payload.type !== 'refresh') {
			res.status(400).json({ message: 'Invalid token!' })
			return
		}
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError) {
			res.status(400).json({ message: 'Token expired!'})
			return
		} else if (e instanceof jwt.TokenExpiredError) {
			res.status(400).json({ message: 'Token expired!'})
			return
		}
	}
	Token.findOne({tokenId: payload.id})
		.exec()
		.then((token) => {
			if (token === null) {
				throw new Error('Invalid token!')
			}
			return updateTokens(token.userId)
		})
		.then(tokens => res.json(tokens))
		.catch(err => res.status(400).json({ message: err.massage}))
}

const confirmEmail= async (req, res) => {
	const userId = jwt.verify(req.params.token, secret)
	try {
		await User.updateOne({_id: userId.id, confirmed: false}, {$set: { confirmed: true}})                               
		res.status(200).json('User has confirmed his email')
	} catch (e) {
		res.status(400).json('error, can`t confirm user:' + err)
	}

}

module.exports = {
	register,
	login,
	refreshTokens,
	jwtSecret,
	confirmEmail
}