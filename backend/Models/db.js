const mongoose = require("mongoose")

const Mongo_URLs = process.env.Mongo_URL

mongoose.connect(Mongo_URLs).then(()=>{
    console.log("Connecting the mongooose")  

}).catch((err)=>{
    console.log("This is a error", err); 
    
})