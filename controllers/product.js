const express = require('express')
const router = express.Router();

const productModel = require('../models/products');

router.get('/', (req,res)=>{
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


router.get('/shoes', (req,res)=>{
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
});

router.get('/valentines',(req,res)=>{
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
});

router.get('/electronics',(req,res)=>{
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
});

router.get('/airpodcase',(req,res)=>{
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
});

module.exports = router;