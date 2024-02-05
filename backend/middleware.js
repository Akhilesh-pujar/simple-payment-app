const JWT_SECERET = require("./config");
const jwt = require("jsonwebtoken");


const authmiddleware = (req,res,next)=>{
   const authheader = req.headers.authorization

   if(!authheader || !authheader.startsWith('Bearer')){

    return res.status(403).json({msg:"authorization not present"})
   }

   const token = authheader.split(" ")[1]

   try{

    const  decoded = jwt.verify(token,JWT_SECERET);
    req.userId = decoded.userId
    next();
    
   }
   catch(err){
    return res.status(403).json({msg:"forbidden"})
   }
}

module.exports={authmiddleware}