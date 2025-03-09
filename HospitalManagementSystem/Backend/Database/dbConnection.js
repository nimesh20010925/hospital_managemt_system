import mongoose from "mongoose";


export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Hospital_Management_System"
    }).then(()=>{
        console.log("Connected to database")
    }).catch(error=>{
        console.log(`some error occured wile connecting to database: ${error}`)
    })
}