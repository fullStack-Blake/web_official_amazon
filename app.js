const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const productModel = require('./models/products');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req,res)=>{
    
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

app.get('/products', (req,res)=>{
    let sale = [];
    sale = productModel.initProduct();

    for(let i=0; i<sale.length;i++){
        if(sale[i].category == 'Electronics')
            sale[i].discount = (sale[i].price*0.8).toFixed(2);
    }
    res.render('product',{
        title: 'Product',
        heading: 'mountains',
        products: sale
    });
});

// for(let i=0; i<productModel.database2.length;i++){
//     app.get(`/products/${productModel.database2[i].category}`,(req,res)=>{
//         let temp = [];

//         for(let j = 0 ;j<productModel.productDB.length; j++){
//             if(productModel.productDB[j].category == productModel.database2[i].name)
//                 temp.push(productModel.productDB[j]);
//         }

//         res.render('product',{
//             title: 'product',
//             heading: 'mountains',
//             products: temp
//         })
//     })
// }
// Can this be a proper way to Use app.get?

app.get('/products/shoes', (req,res)=>{
    let temp = [];

    for(let i=0;i<productModel.productDB.length ;i++){
        if(productModel.productDB[i].category == 'shoes')
            temp.push(productModel.productDB[i]);
    }

    res.render('product',{
        title: 'Product',
        heading: 'mountains',
        products: temp
    });
})

app.get('/products/valentines',(req,res)=>{
    let temp = [];

    for(let i=0;i<productModel.productDB.length ;i++){
        if(productModel.productDB[i].category == 'valentines')
            temp.push(productModel.productDB[i]);
    }

    res.render('product',{
        title: 'product',
        heading: 'mountains',
        products: temp
    })
})

app.get('/products/electronics',(req,res)=>{
    let temp = [];
    let discount;
    for(let i=0;i<productModel.productDB.length ;i++){
        if(productModel.productDB[i].category == 'electronics')
            temp.push(productModel.productDB[i]);
    }

    for(let i=0; i<temp.length; i++){
            temp[i].discount = (temp[i].price*0.8).toFixed(2);
    }

    res.render('product',{
        title: 'product',
        heading: 'mountains',
        products: temp,
    })
})

app.get('/products/airpodcase',(req,res)=>{
    let temp = [];

    for(let i=0;i<productModel.productDB.length ;i++){
        if(productModel.productDB[i].category == 'airpodcase')
            temp.push(productModel.productDB[i]);
    }

    res.render('product',{
        title: 'product',
        heading: 'mountains',
        products: temp
    })
})


app.get('/register', (req,res)=>{
    res.render('register',{
        title: 'Register Page',
        heading: 'mountains'
    });
});

app.post('/register', (req, res)=>{
    let allPass = true;
    
    if(req.body.firstName == ""){
        var firstNameW = 'Enter Your First Name';
        allPass = false;
    }
    if(req.body.lastName == ""){
        var lastNameW = 'Enter Your last Name';
        allPass = false;
    }
    if(req.body.email == ""){
        var emailW = 'Enter Your Email';
        allPass = false;
    }
    if(req.body.password == ""){
        var passwordW = 'Enter Your password';
        allPass = false;
    }
    if(req.body.passwordAgain == ""){
        var passwordAW = 'Enter Your password Again';
        allPass = false;
    }
    if(req.body.password.length < 6){
        var passLength = 'Enter at least 6 characters';
        allPass = false;
    }
    if(req.body.password != req.body.passwordAgain){
        var passEqual = 'Enter the same password';
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
    else{
        res.render('confirm', {
            title: 'Confimation Page',
            heading: 'Welcome to mountains',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        })
    }
})
app.get('/login', (req, res)=>{
    res.render('login', {
        title: 'Log In Page',
        heading: 'mountains',
    })
})

app.post('/login', (req,res)=>{
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
        console.log('WHAT HAPPENED')
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

const PORT=process.env.PORT || 3000; 


app.listen(PORT, ()=>{
    console.log('Connected!');
});