import express from "express";
import bodyParser from 'body-parser';
import Post from "./models/post";
import mongoose from 'mongoose';

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/numean-db')
  .then(() => {
    console.log('MondoDB connections established!!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const dap = express(),
  port = process.env.PORT || 3000;

// Middleware
dap.use(bodyParser.json());
dap.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

dap.post("/api/posts", (req, res, next) => {
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

dap.get('/api/posts', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: 'Posts sent successfully!',
        data: posts
      });
    });
});

dap.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({
      _id: req.params.id
    })
    .then((result) => {
      console.log(result);
    });
  res.status(200).json({
    message: 'Post deleted successfully!'
  });
})

dap.listen(port, () => {
  console.log('Listening on PORT: %s', port);
});
