const mongoose = require("mongoose")
mongoose.set("strictQuery",false);
const dotenv = require('dotenv');
dotenv.config();
const mongodbURL=process.env.MONGOURL;

const connectToMongo=()=>{
        mongoose.connect(mongodbURL,{ useNewUrlParser: true },()=>{
        console.log("Connected to mongodb");
})
}

module.exports=connectToMongo;