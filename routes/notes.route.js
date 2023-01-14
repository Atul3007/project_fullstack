const express=require("express");
const note_router=express.Router();
const {notesmodel}=require("../models/note.model")

note_router.get("/",async(req,res)=>{
    try {
        const data=await notesmodel.find();
        res.json(data);    
    } catch (error) {
        console.log(error);
        res.json("Unable to fetch data");
    }
    
})
note_router.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const newnote=new notesmodel(payload);
        await newnote.save();
        res.json("Note created")
    } catch (error) {
        console.log(error);
        res.json("Something went wrong");
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
            res.json("Updated");
        }else{
            res.json({"msg":"You are not authneticate"});
        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"something went wrong"});
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
        res.json("Deleted");
        }else{
            res.json({"msg":"You are not authneticate"});
        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"something went wrong"});
    }
})
module.exports={
    note_router
}