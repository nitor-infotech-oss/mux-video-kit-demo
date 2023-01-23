// import express from 'express';
// import 'dotenv/config';

// const app = express();
// const port = 3000;

// console.log(process.env.DB_USER); // 👉️ "james_doe"
// console.log(process.env.ENV); // 👉️ "test"
// // console.log(process.env.DB_PORT); // 👉️ "9999"

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   return console.log(`Express is listening at http://localhost:${port}`);
// });

import axios from 'axios';
import express from 'express'
import mongoose from 'mongoose'
import Mux from '@mux/mux-node'
import cors from 'cors'
import * as routes from './routes/routes';
const app = express()
const corsOpts = {
  origin: '*',
}
const uploadModel = require('./models/upload')
// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOpts))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Allow you to store API keys in a .env file and load them in as needed
const dotenv = require('dotenv');
dotenv.config();

const baseUrl = 'https://api.mux.com'
const port = process.env.PORT || 5000



const options = {
  headers: {
    'User-Agent': `Mux Direct Upload Button`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  auth: {
    username: process.env.MUX_ACCESS_TOKEN_ID,
    password: process.env.MUX_SECRET_KEY,
  },
  mode: 'cors',
}

const mongoUrl = "mongodb://localhost:27017/muxTry"

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`MongoDB is running`)
  })
  .catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    // process.exit();
  })

routes.registerRoutes(app) // Account Routes registration

export default app;