const express=require('express')
const cors=require("cors")
const bodyParser=require('body-parser')
console.log(express)
const app=express()
app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send("Hey its a vue project")
})

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Running on port 5000")
})