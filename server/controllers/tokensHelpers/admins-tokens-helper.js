const jwt = require('jsonwebtoken');
const { secret, tokens} = require ('../../config/config').jwtAdmin;
const mongoose = require('mongoose')
const uuid = require('uuid')
const Token = mongoose.model('adminToken');
mongoose.set('useFindAndModify', false);

const generateAccessToken = data  => {
    const payload = {
        ...data,
        type: tokens.access.type
    };
    const options = { expiresIn: tokens.access.expireIn };
    return jwt.sign( payload, secret, options);
};

const generateRefreshToken = data => {
    const payload = {
        _id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        uniq: uuid(),
        type: tokens.refresh.type,
    };
    const options = { expiresIn: tokens.refresh.expireIn };

    return {
        id: payload._id,
        token: jwt.sign(payload, secret, options),
    };
};

const replaceDbRefreshToken = (tokenId, adminId) => {
    Token.findOneAndRemove({ adminId })
    Token.create({ tokenId, adminId})   
}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
}