const mongoose=require("mongoose");
const connection =mongoose.connect("mongodb+srv://Atul:Up090859@cluster0.ovypt5f.mongodb.net/nem101?retryWrites=true&w=majority");
module.exports={
    connection
}