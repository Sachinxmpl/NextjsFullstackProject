import mongoose from "mongoose"

type ConnectionObject  = {
    isConnected? : number 
}

const connection : ConnectionObject = {} 

const connectDb = async() : Promise<void> =>{
     if(connection.isConnected){
        console.log("Already connected to database")
        return
     }

     try{
        const db = await mongoose.connect(process.env.DB_URI || "")
        connection.isConnected = db.connections[0].readyState
        console.log("detabase connected")
     }
     catch(e){
        console.log(e)
        process.exit()
     }
}

export {
   connectDb
}