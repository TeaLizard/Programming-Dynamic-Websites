const express = require('express');
const path = require('path');
var myApp = express();

myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname));
myApp.set('view engine', 'ejs');

myApp.get('/', function(req, res){
    res.render('index'); // no need to add .ejs to the file name
});


myApp.listen(8080);
console.log('Everthing executed fine.. Open http://localhost:8080/');