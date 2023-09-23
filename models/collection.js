// create modal
// for this we use mongoose library, import mongoose library
const mongoose=require('mongoose')
// define schema
// schema means feilds and values of the collection,that is modal's architecture
const userSchema = new mongoose.Schema({
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})
// now create modal
const users=new mongoose.model("users",userSchema)

// this model is make use by controllers for building logic.So we need to import modal in contollers folder.
// therefor first we need to export this file

module.exports=users