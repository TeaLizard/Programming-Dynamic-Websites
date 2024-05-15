const express = require('express');
const path = require('path');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/inClass4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Order = mongoose.model('Order', {
    name : String,
    email : String
});

var myApp = express();
myApp.use(express.urlencoded({extended:false}));

myApp.set('views', path.join(__dirname, 'views'));

myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

myApp.get('/', function(req, res){
    res.render('main');
});

myApp.post('/thanks', [
    check('name', 'Must have a name').not().isEmpty(),
    check('email', 'Must have email').isEmail()
],function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors); // check what is the structure of errors
        res.render('main', {
            errors:errors.array()
        });
    }
    else{
        var name = req.body.name;
        var email = req.body.email;

        var pageData = {
            name : name,
            email : email
        }

        var myOrder = new Order(pageData);
        myOrder.save().then(function(){
            console.log('New order created');
        });

        res.render('thanks', pageData);
    }
});

myApp.listen(8080);
console.log('Everything executed fine.. website at https://localhost:8080');