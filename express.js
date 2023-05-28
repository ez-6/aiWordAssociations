
require('dotenv').config()

//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

//global.require = require; //this will make require at the global scobe and treat it like the original require

//const { getWords, performSearch } = require('./static/main')
//import { getWords } from './static/main.js';
const express = require('express')
//import express from 'express';
const path = require('path')
//import path from 'path';
//import { fileURLToPath } from 'url';
const fileURLToPath = require('url')
const dotenv = require('dotenv')
const { getAiResponse } = require('./static/ai')
//import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
//const { init: aiInit} = require('./static/ai.js')

dotenv.config();


//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express()
const port = 3000;
const router = express.Router();

//app.use('/static', ))
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

//aiInit();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/express/index.html')) 
})
 
router.post('/words', async (req, res) => {
  getAiResponse(req.body.query)
  //.then((res => JSON.parse(res)))
  .then(data => {
    let isValidJson = true
    try{
      JSON.parse(data)
    }
    catch(err){
      isValidJson = false;
    }
      console.log(data);
       res.status(201).send(isValidJson ? data : '{}');
  })

})

// router.post('/word', (req, res) => {
//   performSearch(req.body.query)
//   res.send('ok')
// })

// add the router
app.use('/', router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})