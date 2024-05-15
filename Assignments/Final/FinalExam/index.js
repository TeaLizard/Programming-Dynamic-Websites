const express = require('express');
const session = require('express-session');
const path = require('path');
const {check, validationResult, body} = require('express-validator');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Order = mongoose.model('Order', {
    name : String,
    studentID : String,
    HTML5Books : Number,
    CSS3Books : Number,
    pens : Number,
    price : Number,
    priceAfterTax : Number,
    tax : Number
});

var myApp = express();
myApp.use(express.urlencoded({extended:false}));

myApp.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true
}));

myApp.set('views', path.join(__dirname, 'views'));

myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

myApp.get('/', function(req, res){
    res.render('main');
});

// var phoneRegexp = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
// var provinceArray = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU', 'ALBERTA', 'BRITISH COLUMBIA', 'MANITOBA', 'NORTHWEST TERRITORIES', 'NUNAVUT', 'QUEBEC', 'SASKATCHEWAN', 'YUKON', 'YUKON TERRITORIES', 'ONTARIO', 'NEW BRUNSWICK', 'NEWFOUNDLAND AND LABRADOR', 'NEWFOUNDLAND', 'LABRADOR', 'NOVA SCOTIA', 'PEI', 'PRINCE EDWARD ISLAND', 'PRINCE EDWARD'];
var idFormat = /^[0-9]{7}$/;
// function validateStudentID(value, {req}){
    
//     if(idFormat.){
//         throw new Error('ID must be a 7 digit number');
//     }
//     return true;
// }

myApp.post('/receipt', [
    check('name', 'Must enter your name').trim().notEmpty(),
    check('studentID', 'StudentID must be a 7 digit number').trim().matches(idFormat)
],function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        res.render('main', {
            errors : errors.array(),
        });
    }
    else{
        var name = req.body.name;
        var studentID = req.body.studentID;
        var HTML5Books = req.body.HTML5Books;
        var CSS3Books = req.body.CSS3Books;
        var pens = req.body.pens;
        var tax = 1.13;
        var price = (HTML5Books * 62.99) + (CSS3Books * 51.99) + (pens * 2.99);
        var priceAfterTax = tax * price;

        var pageData = {
            name : name,
            studentID : studentID,
            HTML5Books : HTML5Books,
            CSS3Books : CSS3Books,
            pens : pens,
            price : price,
            priceAfterTax : priceAfterTax,
            tax : tax
        }

        var myOrder = new Order(pageData);
        myOrder.save().then(function(){
            console.log('New order created');
        });

        res.render('receipt', pageData);
    }
});

myApp.post('/viewAll', function(req, res){
    Order.find({}).then(function(orders){
        res.render('viewAll', {orders:orders});
    }).catch(function(err){
        console.log('Error: ' + err);
    });
});

myApp.listen(8080);
console.log('Everything executed fine.. website at http://localhost:8080');



