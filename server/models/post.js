const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
tinyMce: {
    type: String,
    required: true
        },
imgUrl: {
    type: String,
    required: true
        },
date: {
    type: Date,
    default: Date.now
  },
author: {
    type: String,
    default: 'Some Romashish'
    },
});

const Post = mongoose.model( "posts", PostSchema);

module.exports = Post;