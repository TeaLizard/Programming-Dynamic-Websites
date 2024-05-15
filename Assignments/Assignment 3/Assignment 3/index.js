const express = require('express');
const path = require('path');
const {check, validationResult} = require('express-validator');

var myApp = express();
myApp.use(express.urlencoded({extended:false}));

myApp.set('views', path.join(__dirname, 'views'));

myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

myApp.get('/', function(req, res){
    res.render('main');
});

var phoneRegexp = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
var provinceArray = ['NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU', 'ALBERTA', 'BRITISH COLUMBIA', 'MANITOBA', 'NORTHWEST TERRITORIES', 'NUNAVUT', 'QUEBEC', 'SASKATCHEWAN', 'YUKON', 'YUKON TERRITORIES', 'ONTARIO', 'NEW BRUNSWICK', 'NEWFOUNDLAND AND LABRADOR', 'NEWFOUNDLAND', 'LABRADOR', 'NOVA SCOTIA', 'PEI', 'PRINCE EDWARD ISLAND', 'PRINCE EDWARD'];
var ballsArray = ['basketball, football'];

myApp.post('/receipt', [
    check('name', 'Must enter your name').trim().notEmpty(),
    check('email', 'Must enter email').trim().isEmail(),
    check('phone', 'Must enter a phone number').trim().matches(phoneRegexp),
    check('address', 'Must enter your address').trim().notEmpty(),
    check('city', 'Must enter your city name').trim().notEmpty(),
    check('province', 'Must enter your province (eg. ON)').trim().toUpperCase().isIn(provinceArray)
],function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty() || (req.body.basketball * 5.5) + (req.body.football * 6.0) < 10){
        console.log(errors); // check what is the structure of errors
        if ((req.body.basketball * 5.5) + (req.body.football * 6.0) < 10){
            console.log('Must purchase at least $10 worth of balls');
        }
        res.render('main', {
            errors : errors.array(),
            price : (req.body.basketball * 5.5) + (req.body.football * 6.0)
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

        res.render('receipt', pageData);
    }
});

myApp.listen(8080);
console.log('Everything executed fine.. website at http://localhost:8080');

