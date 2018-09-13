import express from 'express';

import Post from "../models/post";

const router = express.Router();


router.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: 'Posts sent successfully!',
        data: posts
      });
    });
});

router.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post not found!'
        });
      }
    });
});

router.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then((savedPost) => {
      res.status(201).json({
        message: "Post created successfully",
        data: savedPost
      });
    });
});

router.patch("/api/posts/:id", (req, res, next) => {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  Post.updateOne({
      _id: req.params.id
    }, {
      $set: post
    })
    .then((err, updatedPost) => {
      console.log('updatedPost', updatedPost);
      res.status(200).json({
        message: "Update successfully!",
        data: updatedPost
      });
    });
});



router.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
      _id: req.params.id
    })
    .then((result) => {
      console.log(result);
    });
  res.status(200).json({
    message: 'Post deleted successfully!'
  });
});

export default router;
