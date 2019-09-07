const Post = require('../models/post')
// дополнить отправку запросов такого рода res.status(200).json(postsFind) *fix
const getAllPosts = async (req, res) => {
  const postsFind = await Post.find()
  try {
    await res.status(200).json(postsFind)
  } catch (err) {
    res.status(401).json('error, can`t get post' + err)
  }
}
 
const createPost = (req, res) => {
  console.log(req.body)
    Post.create(req.body)
      .then(post => {
        res.status(200).send(post);
      })
      .catch(err => {
        res.status(401).json('error, can`t create post' + err)
      })
}

const editPost = (req, res) => {
    Post.findByIdAndUpdate({_id: req.params.id}, req.body)
      .then(() => {
        Post.findOne({_id: req.params.id})
          .then(post => {
            res.send(post);
          });
      })
      .catch(err => {
        res.status(401).json('error, can`t edit post: ' + err)
      })
  };

  const deletePost = (req, res) => {
    Post.deleteOne({_id: req.params.id})
      .then(post => {
        res.send(post);
      })
      .catch(err => {
        res.status(401).json('error, can`t delete post: ' + err)
      })
  };

  module.exports = {
    createPost,
    deletePost,
    editPost,
    getAllPosts
}