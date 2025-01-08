require('dotenv').config()
const express=require('express')
const {connectToDatabase,client}=require('./config/database')
const router=require('./routes/studentRoutes')
const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use('/api',router)
app.get('/',async(req,res) => {
    try {
        const db=await connectToDatabase()
        res.send("connection successfull")
    } catch (error) {
        res.status(500).send("Error Connection")
    }
})
app.listen(port,()=>{
    console.log(`vous avez connecté sur http://localhost:${port}`)
})
