const express=require("express");
const user_router=express.Router();
const { usermodel } = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

user_router.post("/register", async (req, res) => {
    const {name,email,pass,age} = req.body
    try {
        bcrypt.hash(pass,5 , async(err, secure_password)=> {
            if(err){
                 console.log(err);
                 res.send("not working");
            }else{
                const user = new usermodel({name,email,pass:secure_password,age});// mongoose prefer this method to enter one data
                await user.save();
                res.send("registerd");
            }
    });
    } catch (error) {
        res.send("Error in registering");
        console.log(error);
    }
})
user_router.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await usermodel.find({email});
        if (user.length) {
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
              if(result){
                const token=jwt.sign({userid:user[0]._id},"masai");
                res.send({ "msg": "Login Successful", "token": token });
              }else{
                res.send("Wrong credientials")    
              }
            });
        }
        else {
            res.send("Wrong credientials")
        }
    } catch (error) {
        res.send("Error in logging");
        console.log(error);
    }
})
module.exports={
    user_router
}