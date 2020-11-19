const express = require('express');
const countrySelectionnewsRouter = express.Router();
const axios = require('axios');
//For Country Selection
countrySelectionnewsRouter.get('/', async(req, res)=> {
    try {
        const fromWebsite = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za';
        const availableCountries = fromWebsite.split(' ');
        const countryAPI = await axios.get(`https://restcountries.eu/rest/v2`);
        const validCountryAPI = countryAPI.data.filter((value)=> {
            return availableCountries.includes(value.alpha2Code.toLowerCase())
        })
        res.render('countrySelection', { countries : validCountryAPI})
    } catch (error) {
        if(error.response) {
            res.render('countrySelection',{countries:null})
            console.log(error.response.data)
            console.log(error.response.status);
            console.log(error.response.headers);
        }else if(error.request) {
            res.render('countrySelection', { countries : null })
            console.log(error.request)
        } else {
            res.render('countrySelection', { countries : null })
            console.error('Error', error.message)
        }
    }
})

//For Country News
countrySelectionnewsRouter.get('/:id', async(req, res)=> {
    try {
        const alpha2Code = req.params.id;
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=${alpha2Code}&apiKey=4e5a3ab7b045409dae7e28dfb2d7d942`);
        res.render('countryNews', { articles : newsAPI.data.articles})
    } catch (error) {
        if(error.response) {
            res.render('countryNews',{articles:null})
            console.log(error.response.data)
            console.log(error.response.status);
            console.log(error.response.headers);
        }else if(error.request) {
            res.render('countryNews', { articles : null })
            console.log(error.request)
        } else {
            res.render('countryNews', { articles : null })
            console.error('Error', error.message)
        }
    }
    
    res.render('countryNews',{url})
})


module.exports = countrySelectionnewsRouter 