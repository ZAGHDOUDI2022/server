const PostModel = require('../models/post.modal')
const UserModel = require('../models/user.modal')
const mongoose = require('mongoose')

// Creat new Post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
  
    try {
      await newPost.save();
      res.status(200).json(newPost);
    } catch (error) { 
      res.status(500).json(error);
    }
  };

  // Get a post

module.exports.getPost = async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await PostModel.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Update a post
module.exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
      if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Delete a post
module.exports.deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // like/dislike a post
module.exports.likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

