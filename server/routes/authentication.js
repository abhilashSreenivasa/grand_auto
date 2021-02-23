const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')

router.get('/',(req,res)=>{
    res.send('It is a vue-node fullstack project')
})
router.post('/',async (req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        console.log(hashedPassword);
    }
    catch{

    }
    res.status(201).send()
})

module.exports=router;