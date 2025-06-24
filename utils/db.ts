import mongoose from "mongoose";

const mongodbUri=process.env.MONGODB_URI!

if(!mongodbUri) throw new Error("Please define mongouri in env variables");

let cached=global.mongoose;
if(!cached){
    cached=global.mongoose = {conn:null, promise: null}
}

export async function connectToDatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const options={
            bufferCommands: true,
            maxPoolSize: 10
        }
        mongoose
        .connect(mongodbUri,options)
        .then(()=>mongoose.connection)
    }
    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise=null;
        throw error
    }
    return cached.conn
}