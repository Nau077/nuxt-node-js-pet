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
  console.log(req.body.cool_data)
  console.log(req.files)
    // Post.create(req.body)
    //   .then(post => {
    //     res.status(200).send(post);
    //   })
    imgUrl = 'data:image/jpeg;base64,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'
    res.status(200).send(req.files);
      // .catch(err => {
      //   res.status(401).json('error, can`t create post' + err)
      // })
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