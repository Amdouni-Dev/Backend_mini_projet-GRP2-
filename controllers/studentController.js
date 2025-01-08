const mongo=require('mongodb')
const {connectToDatabase}=require('../config/database')

const createUser=async (req,res) => {
    try {
        const {firstName,lastName,age} = req.body
        const db=await connectToDatabase()
        const result= await db.collection('students').insertOne({firstName,lastName,age})
        res.status(201).json({message:"etudiant crée avec succés",userId:result.insertedId  })
    } catch (error) {
        res.status(500).json({erreur:error.message})
        
    }
}

const updateUser=async(req,res) => {
    try {
        const {id}=req.params
        const {firstName,age}=req.body
        const db=await connectToDatabase()
        const result=await db.collection('students').updateOne(
            {_id: new mongo.ObjectId(id)  },// pour la recherche 
            {$set: {firstName,age}}
        )
if(result.modifiedCount===0){
   return  res.status(404).json({message:"user not found"})
}
return res.status(200).json({message:"User updated"})
        
    } catch (error) {
        res.status(500).json({erreur:"Erreur serveur "+error.message})
        
    }
}
const getStudents=async(req,res) => {
    try {
        const db=await connectToDatabase()
        const result=await db.collection('students').find().toArray()
        res.status(200).json({message:"get all students",users:result})
    } catch (error) {
     res.status(500).json({erreur:"erreur !"+ error.message})   
    }
}
const deleteUser=async(req,res) =>{
try {
    const db=await connectToDatabase()
    const{id}=req.params
    const result=await db.collection('students').deleteOne({_id:new mongo.ObjectId(id)})
    if(result.deletedCount===0){
        return res.status(404).json({ msg:"user not found" })
    }
    return res.status(200).json({"message":"user deleted"})
} catch (e) {
    res.status(500).json({er:"erreur! "+e.message})
}

}

// recherche by name ADAM , 
const searchByfirstName=async(req,res) => {
try {
    const db=await connectToDatabase()
    const student =await db.collection('students').findOne({firstName:"ADAM"})
    if(student){
        res.status(201).json({message:"student exist"})

    }
res.status(404).json({message:"student not exist"})

} catch (error) {
    res.status(500).json({er:"erreur! "+e.message})

}
}
module.exports={createUser,updateUser,getStudents,deleteUser,searchByfirstName}