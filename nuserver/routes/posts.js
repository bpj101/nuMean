import express from 'express';
import multer from 'multer';

import Post from "../models/post";

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    };

    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


router.get('', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: 'Posts sent successfully!',
        data: posts
      });
    });
});

router.get("/:id", (req, res, next) => {
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

router.post("", multer({
  storage: storageConfig
}).single('image'), (req, res,
  next) => {
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

router.patch("/:id", (req, res, next) => {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  Post.updateOne({
      _id: req.params.id
    }, {
      $set: post
    })
    .then(() => {
      res.status(200).json({
        message: "Update successfully!",
        data: post
      });
    });
});



router.delete("/:id", (req, res, next) => {
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

export {
  router
};
