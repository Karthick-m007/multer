const express = require ('express')
require('dotenv').config()
const mongoose= require("mongoose")



const session=require('express-session')
const mongodbsession=require("connect-mongodb-session")(session)

const cors=require('cors')
const productRoute = require('./route/createproductRoute')
const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const path = require('path');

// Serve 'upload' folder statically


mongoose.connect(process.env.MongoDb)
.then(()=>console.log("connected to mongodb"))
.catch((err)=>console.log("not connected to db",err))


app.use(cors({
    origin:["http://localhost:3001"],
    credentials:true
}))

app.use(productRoute)




const PORT=process.env.PORT||5001

app.listen(PORT,()=>{
    console.log(`server is running at the ${PORT}`)
})