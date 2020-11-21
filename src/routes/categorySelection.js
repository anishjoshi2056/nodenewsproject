const express = require('express');
const categorySelectionnewsRouter = express.Router();
const axios = require('axios');

categorySelectionnewsRouter.get('/',async(req,res)=>{
    let category = 'business entertainment general health science sports technology';
    let cateogoryList = category.split(' ')
    //see the views folder
    res.render('categorySelection',{cateogoryList})
})

categorySelectionnewsRouter.get('/:id',async(req,res)=> {
    try {
        let category = req.params.id;
        const fromWebsite = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za';
        const availableCountries = fromWebsite.split(' ');
        const countryAPI = await axios.get(`https://restcountries.eu/rest/v2`);
        const validCountryAPI = countryAPI.data.filter((value)=> {
            return availableCountries.includes(value.alpha2Code.toLowerCase())
        })
        res.render('countrySelection', { countries : {Countries:validCountryAPI,category:category}})
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
categorySelectionnewsRouter.get('/:id/:country',async(req,res)=> {
try {
    let info = {
        category:req.params.id,
        country :req.params.country
    }
    const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=${info.country}&category=${info.category}&apiKey=4e5a3ab7b045409dae7e28dfb2d7d942`);
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