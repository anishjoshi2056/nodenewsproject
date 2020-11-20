const express = require('express');
const categorySelectionnewsRouter = express.Router();
const axios = require('axios');

categorySelectionnewsRouter.get('',async(req,res)=>{
    let category = 'business entertainment general health science sports technology';
    let cateogoryList = category.split(' ')
    const countryAPI = await axios.get(`https://restcountries.eu/rest/v2`);
    res.render('categorySelection',{cateogoryList})
})

categorySelectionnewsRouter.get('/:id',async(req,res)=> {
    try {
        let category = req.params.id
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=4e5a3ab7b045409dae7e28dfb2d7d942`);
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

module.exports = categorySelectionnewsRouter;