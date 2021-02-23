if(process.env.NODE_ENV!=='production')
require('dotenv').config()

const express=require('express')
const cors=require("cors")
const bodyParser=require('body-parser')

const authentication=require('./routes/authentication')

const app=express()
const mongoose=require('mongoose')
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,
    useUnifiedTopology: true
})
const db=mongoose.connection

db.on('error',(e)=>{
    console.error(e)
})
db.once('open',()=>console.log("connected to mongoose"))
app.get('/',(req,res)=>{
    res.send("Hey its a vue project")
})
app.use('/register',authentication)




const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Running on port 5000")
})