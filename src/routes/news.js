const express = require('express');
const newsRouter = express.Router();
const axios = require('axios');

newsRouter.get('', async(req, res)=> {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=4e5a3ab7b045409dae7e28dfb2d7d942`);
        res.render('news', { articles : newsAPI.data.articles})
    } catch (error) {
        if(error.response) {
            res.render('news',{articles:null})
            console.log(error.response.data)
            console.log(error.response.status);
            console.log(error.response.headers);
        }else if(error.request) {
            res.render('news', { articles : null })
            console.log(error.request)
        } else {
            res.render('news', { articles : null })
            console.error('Error', error.message)
        }
    }
})

module.exports = newsRouter 