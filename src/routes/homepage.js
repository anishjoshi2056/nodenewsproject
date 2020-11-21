const express = require('express');
const homepageRouter = express.Router();
const axios = require('axios');

homepageRouter.get('/',async(req,res)=> {
    res.render('homepage')
})
module.exports = homepageRouter;