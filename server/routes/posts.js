const express = require('express')
const posts = express.Router()
const cors = require('cors')
const postsController = require('../controllers/posts-controller')
const authMiddleware = require('../middleware/admin-auth-middleware')

posts.use(cors())

posts.get('/', postsController.getAllPosts)
posts.put('/:id', authMiddleware, postsController.editPost)
posts.delete('/:id', authMiddleware, postsController.deletePost)
posts.post('/createPost', postsController.createPost)

module.exports = posts;