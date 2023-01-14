const jwt=require("jsonwebtoken");

const authhenticate=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
       const decoded = jwt.verify(token,"masai");
       if(decoded){
        const userid=decoded.userid;
        //console.log(decoded);
        req.body.userid=userid;
        next();
       }else{
        res.send("Please login first");
       }
    }else{
        res.send("Please login first");
       }
}

module.exports={
    authhenticate
}