const express = require('express');
const session = require('express-session');
const path = require('path');
const {check, validationResult, body} = require('express-validator');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/assignment4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Order = mongoose.model('Order', {
    name : String,
    email : String,
    phone : String,
    address : String,
    city : String,
    province : String,
    basketballs : Number,
    footballs : Number,
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

var phoneRegexp = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
var provinceArray = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU', 'ALBERTA', 'BRITISH COLUMBIA', 'MANITOBA', 'NORTHWEST TERRITORIES', 'NUNAVUT', 'QUEBEC', 'SASKATCHEWAN', 'YUKON', 'YUKON TERRITORIES', 'ONTARIO', 'NEW BRUNSWICK', 'NEWFOUNDLAND AND LABRADOR', 'NEWFOUNDLAND', 'LABRADOR', 'NOVA SCOTIA', 'PEI', 'PRINCE EDWARD ISLAND', 'PRINCE EDWARD'];

function checkPrice(value, {req}){
    const ballsArray = [req.body.basketball * 5.5, req.body.football * 6.0];
    var sum = 0;
    ballsArray.forEach( value => {
        sum += value;
      }
    );
    if(sum < 10){
        throw new Error('Purchase must be over 10$ ($' + sum.toFixed(2) + ')');
    }
    return true;
}

myApp.post('/receipt', [
    check('name', 'Must enter your name').trim().notEmpty(),
    check('email', 'Must enter email').trim().isEmail(),
    check('phone', 'Must enter a phone number').trim().matches(phoneRegexp),
    check('address', 'Must enter your address').trim().notEmpty(),
    check('city', 'Must enter your city name').trim().notEmpty(),
    check('province', 'Must enter your province (eg. ON)').trim().toUpperCase().isIn(provinceArray),
    check('basketball').custom(checkPrice)
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
        var email = req.body.email;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;
        var province = req.body.province;
        var basketballs = req.body.basketball;
        var footballs = req.body.football;
        var tax;
        switch (province)
        {
            case 'AB': case 'BC': case 'MB': case 'NT': case 'NU': case 'QC': case 'SK': case 'YT': case 'ALBERTA': case 'BRITISH COLUMBIA': case 'MANITOBA': case 'NORTHWEST TERRITORIES': case 'NUNAVUT': case 'QUEBEC': case 'SASKATCHEWAN': case 'YUKON': case 'YUKON TERRITORIES':
                tax = 1.05;
                break;
            case 'ON': case 'ONTARIO':
                tax = 1.13;
                break;
            case 'NB': case 'NL': case 'NS': case 'PE': case 'NEW BRUNSWICK': case 'NEWFOUNDLAND AND LABRADOR': case 'NEWFOUNDLAND': case 'LABRADOR': case 'NOVA SCOTIA': case 'PEI': case 'PRINCE EDWARD ISLAND': case 'PRINCE EDWARD':
                tax = 1.15;
                break;
        }
        var price = (basketballs * 5.5) + (footballs * 6.0);
        var priceAfterTax = tax * price;

        var pageData = {
            name : name,
            email : email,
            phone : phone,
            address : address,
            city : city,
            province : province,
            basketballs : basketballs,
            footballs : footballs,
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



