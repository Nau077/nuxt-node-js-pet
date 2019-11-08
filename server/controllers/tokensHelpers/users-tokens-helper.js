const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const { secret, tokens} = require ('../../config/config').jwt
const mongoose = require('mongoose')
const Token = mongoose.model('Token')
mongoose.set('useFindAndModify', false)

const generateAccessToken = data  => {
	const payload = {
		...data,
		type: tokens.access.type
	}
	const options = { expiresIn: tokens.access.expireIn }
	return jwt.sign( payload, secret, options)
}

const generateRefreshToken = data => {
	const payload = {
		_id: data._id,
		first_name: data.first_name,
		last_name: data.last_name,
		email: data.email,
		type: tokens.refresh.type,
	}
	const options = { expiresIn: tokens.refresh.expireIn }

	return {
		id: payload._id,
		token: jwt.sign(payload, secret, options),
	}
}

const replaceDbRefreshToken = (tokenId, userId) => {
	Token.findOneAndRemove({ userId })
	Token.create({ tokenId, userId})   
}


module.exports = {
	generateAccessToken,
	generateRefreshToken,
	replaceDbRefreshToken
}