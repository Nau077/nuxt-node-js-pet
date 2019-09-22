const Post = require('../models/post')
const fs = require("fs");
const path = require('path');
// дополнить отправку запросов такого рода res.status(200).json(postsFind) *fix

function decodeBase64Image(dataString) {
 const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

const writeImageFromPost = async (req, res) => {
    const image = req.files.file.data
    fs.writeFile(`images/${req.files.file.name}`, image, function(err){
      console.error(err)
    });
    const imgUrl = {
      location: `http://localhost:4000/${req.files.file.name}`
    }
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
 
const createPost = (req, res) => {
  // console.log(req.body.cool_data)
  console.log(req.files)
    // Post.create(req.body)
    //   .then(post => {
    //     res.status(200).send(post);
    //   })
    
    imgUrl ={ location : 'https://timesofindia.indiatimes.com/thumb/msid-70143101,imgsize-1269404,width-800,height-600,resizemode-4/70143101.jpg'}
    
    let newFile = JSON.stringify(imgUrl)
    console.log()
    res.status(200).send(newFile);
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
    getAllPosts,
    writeImageFromPost 
}