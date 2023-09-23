const users=require("../models/collection")
const jwt=require('jsonwebtoken')

// we need to import collections from the modal.All importing are done at the top of the file

// register for account creation
register=(req,res)=>{
 // * from register form in frond end, we access the data that passed along with api *

    const{acno,psw,uname}=req.body

    // THIS CODE SHORTENING IS DESTRUCTURING

    // check if the user data is already present in collection using server command
    //server command -databaseName.collectionName.findOne({key:value})
    // here no need of database name , users is the collection name , key and value are the same ({acno:acno}) so shortening code as ({acno})
    // findOne method is accyncronous ,so .then used
    // store the responce of findOne method using then in user variable (resposce are  object that contain all the data of user if the acno is find or not find that is null)


    users.findOne({acno}).then(user=>{
        // checking
        // is user already exist, the output of if block is the boject. so whethwr if block work,it means already exist
        if(user){

           
            res.status(400).json({
            message:"The user is alredy exist",
            status:false,
            statusCode:400
            })
        }
        // if block didn't work means no object is received as responce, then the user is not already exist.so we create a object for new user for storing his data
        else{
            // create an object for user
            // collection il ulla ellaa key kkum values chellanam. acno=acno,so shorten as acno
            const newUser=new users({
                acno,
                uname,
                psw,
                balance:0,
                transaction:[]
            })
            // save the user into database

            newUser.save()
            res.status(201).json({
                message:"account created successfully",
                status:true,
                statusCode:201
            })
        }
    })
}

login=(req,res)=>{
    // access data for login
    const {acno,psw}=req.body
    users.findOne({acno,psw}).then(user=>{
        if(user){

             // generate token for security
             const token=jwt.sign({acno},"securitykey123")
            res.status(200).json({
                message:"login success",
                status:true,
                statusCode:200,
                currentUser:user.uname,
                token


            })
        }
        else{
            res.status(404).json({
                message:"invalid username or password",
                status:false,
                statusCode:404
            })
        }
    })
}

getBalance=(req,res)=>{
// access acno from request param
const {acno}=req.params
users.findOne({acno}).then(user=>{
    if(user){
        res.status(200).json({
            message:user.balance,
            status:true,
            statusCode:200
            
        })
    }
    else{
        res.status(404).json({
            message:"User Not Found",
            status:false,
            statusCode:404
        })
    }
})
}

// logic of money transfer
transferMoney=(req,res)=>{
    // collecting sufficient data from the api
    const {sAcno,rAcno,psw,amount,date}=req.body
    // here we get amount as string,but we need it as number for further calculation like subtracting from bank balance.convert it
    var amnt=parseInt(amount)
    // checking the sender is exist or not
    users.findOne({acno:sAcno, psw}).then(suser=>{
        if(suser){

            // now check the receiver exist or not
            users.findOne({acno:rAcno}).then(ruser=>{
                // angne oru user ne kitti enkil
                if(ruser){
                //   if receiver also exists,then check the balance
                if(amnt<=suser.balance){

                //    update sender account
                suser.balance=suser.balance-amnt
                suser.transactions.push({tacno:rAcno,amount:amnt,type:"DEBIT",date})
                suser.save()

                console.log(suser);
                // update receiver account
                ruser.balance=ruser.balance+amnt
                ruser.transactions.push({tacno:sAcno,amount:amnt,type:"CREDIT",date})
                ruser.save()

                // if all the above code works and success,a resposce is sended to frond wnd
                res.status(200).json({
                    message:"TRANSACTION SUCCESS !!",
                    status:true,
                    statusCode:200
    
                })
                }
                else{
                    res.status(406).json({
                        message:"insufficient balance",
                        status:false,
                        statusCode:406
                        })
                }
                }
                // kittiyillenkil
                else{
                    res.status(404).json({
                        message:"invalid credit credentials",
                        status:false,
                        statusCode:404
                        })
                }
            })

        }
        else{
            res.status(404).json({
                message:"invalid debit credentials",
                status:false,
                statusCode:404
                })
        }
    })

}
accountStatement=(req,res)=>{
    const {acno} = req.params
    users.findOne({acno}).then(user=>{
   if(user){
    res.status(200).json({
        message:user.transactions,
        status:true,
        statusCode:200

    })
   }
   else{
    res.status(404).json({
        message:"User Not Found",
        status:false,
        statusCode:404
    })
   }
    })
}

accountDelete=(req,res)=>{
    const{acno}=req.params
    users.deleteOne({acno}).then(data=>{
        if(data){
            res.status(200).json({
                message:"Account deleted successfully",
                status:true,
                statusCode:200
        
            }) 
           
        }
       
    })
}
// if we need to export more than one function,then use {} and comma for seprating each function
 module.exports={register,login,getBalance,transferMoney,accountStatement,accountDelete}