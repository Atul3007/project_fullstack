const mongoose=require("mongoose");
const connection =mongoose.connect("mongodb+srv://Atul:Up090859@cluster0.ovypt5f.mongodb.net/nem?retryWrites=true&w=majority");
module.exports={
    connection
}