const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const RegisterUser=require('../models/authentication')
const passport=require('passport')


router.post('/register',async (req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const registerUser=new RegisterUser({
            uname:req.body.uname,
            email:req.body.email,
            password:hashedPassword
        })
        await registerUser.save()
        res.status(201).send()
    }
    catch{
        const duplicateCheck=await RegisterUser.find({email:req.body.email})
        if(duplicateCheck)
        res.status(409).send({error:"Email already exists"})
        else
        res.status(500).send()
    }
})

router.get('/login',(req,res)=>{
    res.send("login here")
})

router.post('/login',passport.authenticate('local',{
    failureFlash:true,
}),function(req,res){
    res.status(200).send();
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(200).send()
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(400).send()
    }
    next()
  }
  



module.exports=router;