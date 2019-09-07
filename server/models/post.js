const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
author: {
    type: String,
    required: true
        },
title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
content: {
    type: String,
    required: true
        },
image: {
    type: Object,
    required: true
}, 
date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model( "posts", PostSchema);

module.exports = Post;