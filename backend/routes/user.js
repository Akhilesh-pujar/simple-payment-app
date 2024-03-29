const express = require("express");
const {Paytmuser, PayAccount} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECERET} = require("../config")
const zod = require("zod");
const router = express.Router();
const {authmiddleware} = require("../middleware")

const signupBody= zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
    
})

router.post("/signup", async(req,res)=>{
    try{
        const {success} = signupBody.safeParse(req.body)

        if(!success){
            return res.json({msg:"Incorrect Inputs/parsing went wrong"})
        }
        //database mai find karenge taki already agar user hai tho usko reject karne ke liye
        const existinguser = await Paytmuser.findOne({
            username:req.body.username})
            if(existinguser){
                return res.json({msg:"Email already taken/Account already exist"})
            }
    
            const user = await Paytmuser.create({
                username:req.body.username,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                password:req.body.password
            })
            const userId = user._id
            await PayAccount.create({
                userId,
                balance: 1 + Math.random() * 10000
            })
    
            const token = jwt.sign({userId},JWT_SECERET)
            res.json({
                msg:"User Created Succesfully",
                token:token
        
        })
    }
    catch(err){
        return res.json(err)
      
    }
   
})




//signin route

const signinbody = zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signin", async(req,res)=>{
    try{
        const {success} = signinbody.safeParse(req.body);

    if(!success){
        return res.json({msg:"Body parsing went wrong/wrong input"})
    }

    const user = await Paytmuser.findById({
        username:req.body.username,
        password:req.body.password
    
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECERET);
        res.json({msg:"Sign in success", token:token})
    }

    }
    catch(err){
        return res.json(err)
      
    }
    
})

//update route

const updatebody= zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    password:zod.string().optional()
})

router.put("/updateuser",authmiddleware, async(req,res)=>{
    try{
        const {success} = updatebody.safeParse(req.body);
        if(!success){
         return res.json({msg:"parsing went wrong"});
        }
        await Paytmuser.updateOne(req.body,{
         _id:req.userId
        })
        res.json({msg:"Update Successfull"})
    }
    catch(err){
        return res.json(err)
      
    }
 
})

 //all users
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await Paytmuser.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id,
            
        }))
    })
})

module.exports= router;
