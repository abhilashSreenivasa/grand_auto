const mongoose=require('mongoose')
const authenticationSchema=new mongoose.Schema({
    uname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('Register',authenticationSchema)