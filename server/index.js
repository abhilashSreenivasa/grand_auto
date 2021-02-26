if(process.env.NODE_ENV!=='production')
require('dotenv').config()

const express=require('express')
const cors=require("cors")
const bodyParser=require('body-parser')
const passport=require('passport')
const flash=require('express-flash')
const session=require('express-session')
const initializePassport=require('./passport-config')
const Authentication=require('./models/authentication')
const methodOverride=require('method-override')

initializePassport(passport,async (email)=>{
    return await Authentication.find({email:email})
},
async (id)=>{
    console.log("this is id:"+id)
    return await Authentication.find({_id:id})
}
)


const authentication=require('./routes/authentication')

const app=express()
const mongoose=require('mongoose')
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(session({
    secret: 'secret',                                           
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

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
app.use('/',authentication)




const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Running on port 5000")
})