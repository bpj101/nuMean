import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { router as postsRoutes } from './routes/posts';


// MongoDB setup
mongoose.connect('mongodb://localhost:27017/numean-db', {
    useNewUrlParser: true
  })
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

dap.use('/api/posts', postsRoutes);

dap.listen(port, () => {
  console.log('Listening on PORT: %s', port);
});
