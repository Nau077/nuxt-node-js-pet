const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AdminTokenSchema = new Schema({
  tokenId: {
    type: String
  },
  adminId: {
    type: String
  }
})

module.exports = adminToken = mongoose.model('adminToken', AdminTokenSchema)