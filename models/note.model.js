const mongoose=require("mongoose");
const notesschema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userid:String
})
const notesmodel=mongoose.model("note",notesschema);
module.exports={
    notesmodel
}