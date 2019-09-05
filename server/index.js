const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const config = require('./config/config')
const users = require('./routes/users')
const posts = require('./routes/posts')
const admins = require('./routes/admins')

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

mongoose.connect( config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .then( app.listen(config.port, function() {
    console.log('Server is running on port: ' + config.port)
  }))
  .catch(err => console.log(err))

app.use(bodyParser.json());

app.use('/users', users)
app.use('/posts', posts)
app.use('/admins', admins)

//  ./mongod.exe