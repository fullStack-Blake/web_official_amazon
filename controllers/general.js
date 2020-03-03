const express = require('express')
const router = express.Router();


const productModel = require('../models/products');

router.get('/', (req,res)=>{
    
    let best = [];
    for(let i =0; i< productModel.productDB.length; i++){
        if(productModel.productDB[i].best)
            best.push(productModel.productDB[i]);
    }

    res.render('home',{
        title: 'Home',
        heading: 'mountains',
        promotions: productModel.initP(),
        categories: productModel.initC(),
        bestSellers: best,
    });
});


router.get('/register', (req,res)=>{
    res.render('register',{
        title: 'Register Page',
        heading: 'mountains'
    });
});

router.post('/register', (req, res)=>{
    let allPass = true;
    let firstNameW, lastNameW, emailW, passwordW, passwordAW, passLength, passEqual;
    if(req.body.firstName == ""){
        firstNameW = 'Enter Your First Name';
        allPass = false;
    }
    if(req.body.lastName == ""){
        lastNameW = 'Enter Your last Name';
        allPass = false;
    }
    if(req.body.email == ""){
        emailW = 'Enter Your Email';
        allPass = false;
    }
    let letters = /^[A-Za-z]+$/;
    if(req.body.password == ""){
        passwordW = 'Enter Your password';
        allPass = false;
    }
    else{
        if(!req.body.password.match(letters)){
            passwordW = 'Enter at least 1 Alphabet';
        }
    }
    if(req.body.passwordAgain == ""){
        passwordAW = 'Enter Your password Again';
        allPass = false;
    }
    if(req.body.password.length < 6){
        passLength = 'Enter at least 6 characters';
        allPass = false;
    }
    if(req.body.password != req.body.passwordAgain){
        passEqual = 'Enter the same password';
        allPass = false;
    }

    if(!allPass){
        res.render('register',{
            title: 'Register Page',
            heading: 'mountains',
            firstName: req.body.firstName,
            warning1: firstNameW,
            lastName: req.body.lastName,
            warning2: lastNameW,
            email: req.body.email,
            warning3: emailW,
            password: req.body.password,
            warning4: passwordW,
            passwordAgain: req.body.passwordAgain,
            warning5: passwordAW,
            warning6: passLength,
            warning7: passEqual,

        })
    }
    //START FROM HERE
    else{

        const {firstName,lastName,email} = req.body;    
        
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        to: `${email}`,
        from: `han.sangyeup@gmail.com`,
        subject: `Welcome to Mountain ${firstName}`,
        html: 
        `
        Thank you for Sign up with us today! ${firstName} ${lastName}. <br>
        Your ID is ${email} <br>
        Enjoy shopping with us now<br>
        `,
        };

    sgMail.send(msg)
    .then(()=>{
        res.render('confirm', {
            title: 'Confimation Page',
            heading: `Welcome ${firstName}`,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        })
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });

        
    }
})
router.get('/login', (req, res)=>{
    res.render('login', {
        title: 'Log In Page',
        heading: 'mountains',
    })
})

router.post('/login', (req,res)=>{
    let emailM = '', passwordM = '';

    if(req.body.email.length < 1){
        emailM = 'Please Enter Your E-mail';
    }
    if(req.body.password.length < 6){
        passwordM = 'Please Enter more than 6 characters';
    }

    if(passwordM.length != 0 || emailM.length != 0){
        res.render('login', {
            title: `Welcome back!`,
            heading: 'mountains',
            warning1: emailM,
            warning2: passwordM,
        })
    }
    else{
        let best = [];
        for(let i =0; i< productModel.productDB.length; i++){
            if(productModel.productDB[i].best)
                best.push(productModel.productDB[i]);
            }

        res.render('home',{
            title: 'Home',
            heading: `Welcome back ${req.body.email}`,
            promotions: productModel.initP(),
            categories: productModel.initC(),
            bestSellers: best,
        });

    }
});

module.exports = router;