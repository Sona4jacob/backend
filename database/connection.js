 // momgodb ne server aayitt connect aakkan moongoose enna library use cheyyum
const mongoose=require('mongoose')
// connect is a method in mongoose,it is asyncronous method 
mongoose.connect(process.env.BASE_URL,{
    // if connection related problem vannaal solve cheyyaan nexr two steps
    useUnifiedTopology:true,
    useNewUrlParser:true
    // since connect method is asyncronous it have the possiblity of coming two output .that is success or failure. it success then then method works else catch method works.for this we add then and catch
}).then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.error("Error in Database Connection")
})
