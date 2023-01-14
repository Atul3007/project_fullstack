const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})
const usermodel=mongoose.model("user",userschema);
module.exports={
    usermodel
}