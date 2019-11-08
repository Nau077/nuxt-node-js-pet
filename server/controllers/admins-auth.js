const Admin = require('../models/Admin')
const Token = require('../models/admin-token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authHelper = require('./tokensHelpers/admins-tokens-helper')
const config = require('../config/config')

const jwtSecret = process.env.SECRET_KEY = config.jwtAdmin.secret

const updateTokens = (payload, res) => {
	const accessToken = authHelper.generateAccessToken(payload)
	const refreshToken = authHelper.generateRefreshToken(payload)
	authHelper.replaceDbRefreshToken(refreshToken.id, payload._id)
	res.json({
		accessToken,
		refreshToken: refreshToken.token
	})
}
const register = (req, res) => {
	const today = new Date()

	const adminData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		created: today
	}
      
	Admin.findOne({
		email: req.body.email
	})
		.then(admin => {
			if (!admin) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					adminData.password = hash
					Admin.create(adminData)
						.then(admin => {
							res.status(200).json({ status: admin.email + ' registered' })
						})
						.catch(err => {
							res.status(401).json('error: ' + err)
						})
				})
			} else {
				res.json({ error: 'Admin already exists' })
			}
		})
		.catch(err => {
			res.status(500).send('error: ' + err)
		})
} 

const login = (req, res) => {
	Admin.findOne({
		first_name: req.body.name
	})
		.exec()
		.then(admin => {
			if (admin) {
				if (bcrypt.compareSync(req.body.password, admin.password)) {
					const payload = {
						_id: admin._id,
						first_name: admin.first_name,
						last_name: admin.last_name,
						email: admin.email
					}
					// let token = jwt.sign(payload, jwtSecret, {
					//   expiresIn: 144000
					updateTokens(payload, res)
					//.then(tokens => res.json(tokens))
					// res.send(token)
				} else {
					res.status(401).json({ error: 'admin does not exist' })
				}
			} else {
				res.status(401).json({ error: 'admin does not exist' })
			}
		})
		.catch(err => {
			res.status(500).send('error: ' + err)
		})
}


const refreshTokens = async (req, res) => {
	const { refreshToken } = req.body

	let payload

	try {
		payload = jwt.verify(refreshToken, jwtSecret)
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
	const token = await Token.findOne({tokenId: payload._id})
	if (token === null) {
		throw new Error('Invalid token!')
	}

	await Admin.findOne({_id: token.adminId}) 
		.then(data => updateTokens(data, res))     
		.then(tokens => res.json(tokens))
		.catch(err => res.status(400).json({ message: err.massage}))
}


module.exports = {
	register,
	login,
	refreshTokens,
	jwtSecret
}