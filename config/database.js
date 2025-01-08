require('dotenv').config()
const {MongoClient}=require('mongodb')
 // acceder aux variables d'environnement
 const uri=process.env.Mongo_Url
 const client=new MongoClient(uri)

 async function connectToDatabase(){
    try {
        await client.connect()
        console.log("Bien Connecté !")
        return client.db('users_v0')
    } catch (error) {
        console.error('Non Connecté')
        process.exit(1)
    }
 }
 module.exports = {connectToDatabase,client}

