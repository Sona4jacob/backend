// here we set all the path of our project,that is api calls.api calles we need for back end are :
    //  create acc -sign up
    // login
    // check balance
    // money transfer
    // acc statement
    // profile view
    // delete acc


    // import express
    const express=require('express')
    // import register function from logic.js
    const {register,login,getBalance, transferMoney}= require('../controllers/logic')

    // import jwtmiddleware form middleware folder
    const{jwtMiddleWare} = require("../middlewares/jwtmiddleware")

   // create object for router
    const router = new express.Router();


    //  1. create acc -sign up
    // api  (path)
    router.post('/bankuser/create_acc',register)

    //  2.login
    router.post('/bankuser/login_acc',login)

    // 3.balance
    router.get('/bankuser/balance_check/:acno',jwtMiddleWare,getBalance)

    // 4.money transfer
    router.post('/bankuser/money_transfer',jwtMiddleWare,transferMoney)

    // 5.Acount statement
    router.get('/bankuser/account_statement/:acno',jwtMiddleWare,accountStatement)
    
    // 6.delete Account
    router.delete('/bankuser/delete_account/:acno',jwtMiddleWare,accountDelete)


    // remember that if we did not connect this file with index.js, then it dindn't work
    // so export this first for importing it in index.js file

     module.exports=router