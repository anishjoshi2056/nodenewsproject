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
    let cat = req.params.id
    res.render('categoryNews',{cat})
})

module.exports = categorySelectionnewsRouter;