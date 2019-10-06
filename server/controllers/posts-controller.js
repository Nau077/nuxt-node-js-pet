const uuid = require('uuid');
const Post = require('../models/post')
const fs = require("fs");
const path = require('path');
// дополнить отправку запросов такого рода res.status(200).json(postsFind) *fix

function generateImgUrl(req) {
  const image = req.files.file.data
  const imageName = uuid() + req.files.file.name.split(' ').join('')
  fs.writeFile(`images/${imageName}`, image, function(err){
    console.error(err)
  });
  return { location: `http://localhost:4000/${imageName}` }
}

const writeImageFromPost = async (req, res) => {
  const imgUrl = generateImgUrl(req)
    try {
       await res.status(200).send(imgUrl);
    } catch (error) {
      res.status(401).json('error, can`t upload image url')
    }
}

const getAllPosts = async (req, res) => {
  const postsFind = await Post.find()
  try {
    await res.status(200).json(postsFind)
  } catch (err) {
    res.status(401).json('error, can`t get post' + err)
  }
}
 
const createPost = async (req, res) => {
  const imgUrl = generateImgUrl(req)
  const dataArr = JSON.parse(req.body.cool_data)
  const postObj = dataArr.reduce((acc, [k, v]) => ({
    ...acc, [k]: v
  }), {})  
  postObj.imgUrl = imgUrl.location

  await Post.create(postObj)
  try {
    await res.status(200).send('post was successfully created');
  } catch (err) {
    res.status(401).json('error, could`nt create post' + err)
  }
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
    getAllPosts,
    writeImageFromPost 
}