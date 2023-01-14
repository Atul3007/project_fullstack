const express=require("express");
const note_router=express.Router();
const {notesmodel}=require("../models/note.model")

note_router.get("/",async(req,res)=>{
    try {
        const data=await notesmodel.find();
        res.send(data);    
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch data");
    }
    
})
note_router.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const newnote=new notesmodel(payload);
        await newnote.save();
        res.send("Note created")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
})
note_router.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const note=await notesmodel.findOne({"_id":id})
    const userid_notes=note.userid;
    const userid_req=req.body.userid;
    try {
        if(userid_req===userid_notes){
            await notesmodel.findByIdAndUpdate({"_id":id},payload);
            res.send("Updated");
        }else{
            res.send({"msg":"You are not authneticate"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"});
    }
})
note_router.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    const note=await notesmodel.findOne({"_id":id})
    const userid_notes=note.userid;
    const userid_req=req.body.userid;
    try {
        if(userid_req===userid_notes){
        await notesmodel.findByIdAndDelete({"_id":id});
        res.send("Deleted");
        }else{
            res.send({"msg":"You are not authneticate"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"});
    }
})
module.exports={
    note_router
}