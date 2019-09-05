const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
description: {
    type: String,
    required: true
},
urlVideo: {
    type: String,
    required: true
},
content: {
    type: String,
    required: true
}
})

module.exports = Courses = mongoose.model('courses', UserSchema)