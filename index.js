// if we have .env file, then we should import env file at the top of the index file
// for importing env file we need a library called .env
// we install in terminal by npm i dotenv, then it installed
// in index file first we import express
require("dotenv").config()
// this will read our environment variables from .env files and assign them to process.env object

const express = require("express")
const router = require("./routes/router")
// importing cors for frond end back end integration
const cors=require('cors')

// next we create server using express

const server = express()
// integrate frond end back end

server.use(cors())

server.use(express.json())
// set router
server.use(router)
// import connection.js
require("./database/connection")

// run the server.for this we set a port
// notice that frond end and backend should not be in same series.here our frond end port series is 4200.therefor we set server port in 5000 series.
// Also along with this we should run env file in this same port. therefor we use process method that controls .env file and set same port that server is running to env file.
const port = 5001 || process.env.port;

// now run the server
server.listen(port, () => {
  console.log(`_______server started at the port number ${port}_______...`)
})

// while running it in node by opening a integrated terminal in the index file works.but whwn we edit it,the content error occurs because node doesn't have the capability of automatic recombilation.Therefor we use nodemon.For this we install nodmon globally.
// api call resolve -post

//  following codes are just examples,but in real project we are not doing this in index file. logics are coded in controllers and path are set in routes
// server.post('/register',(req,res)=>{
//     res.send("post method working")
// })
// server.post('/login',(req,res)=>{
//     console.log(req.body.accno);
//     console.log(req.body.psw);
//     res.send("login worked")
// })
// server.get('/getexec',(req,res)=>{
//     res.send("execution  working")
// })
