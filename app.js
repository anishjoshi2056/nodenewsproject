const express = require('express');
const app = express();
const port = 5000;

//Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname + "public/css")) // to replicate press alt + shift + down
app.use('/images',express.static(__dirname + "public/images"))
app.use('/js',express.static(__dirname + "public/js"))

app.listen(port,()=> {
    console.log(`Listening to the port ${port}`)
})