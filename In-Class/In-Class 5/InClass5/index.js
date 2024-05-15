const express = require('express');
const session = require('express-session');
const path = require('path');
const {check, validationResult, body} = require('express-validator');
const mongoose = require('mongoose');

console.log("Start");

mongoose.connect('mongodb://localhost:27017/InClass5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Admin = mongoose.model('Admin', {
    username : String,
    password : String
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

myApp.get('/',function(req, res){
    if(req.session.userLoggedIn){
        res.render('welcome');
    }
    else{
        res.redirect('/login');
    }
});

// myApp.post('/',function(req, res){
//     if(req.session.userLoggedIn){
//         res.render('welcome');
//     }
//     else{
//         res.redirect('/login');
//     }
// });

myApp.get('/login', function(req, res){
    if(req.session.userLoggedIn){
        res.redirect('/');
    }
    else{
        res.render('login');
    }
    
});

myApp.post('/login', function(req, res){

    var user = req.body.username;
    var pass = req.body.password;

    console.log('1');
    Admin.findOne({username: user, password: pass}).then(function(admin){
        // log any errors
        console.log('2');
        console.log('Admin: ' + admin);
        if(admin){
            //store username in session and set logged in true
            req.session.username = admin.username;
            req.session.userLoggedIn = true;
            // redirect to the dashboard
            res.redirect('/');
        }
        else{
            res.render('login', {error: 'Sorry, cannot login!'});
        }
    }).catch(function(err){
        console.log('Error: ' + err);
    })
});




myApp.listen(8080);
console.log('Everything executed fine.. website at http://localhost:8080');

