const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')

//Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + "public/css")); // to replicate press alt + shift + down
app.use('/images',express.static(__dirname + "public/images"));
app.use('/js',express.static(__dirname + "public/js"));

//Templating and view engine
app.set('views','./src/views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))

// Routes
const newsRouter = require('./src/routes/news')
const countrySelectionnewsRouter = require('./src/routes/countrySelection')
const categorySelectionnewsRouter = require('./src/routes/categorySelection')
//For homepage
const homepageRouter = require('./src/routes/homepage')
//Homepage Route
app.use('/',homepageRouter)
// app.use('/', newsRouter);
app.use('/country',countrySelectionnewsRouter);
app.use('/category',categorySelectionnewsRouter);

app.listen(port,()=> {
    console.log(`Listening to the port ${port}`);
})