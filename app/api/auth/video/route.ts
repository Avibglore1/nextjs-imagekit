import Video from "@/models/Video";
import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await connectToDatabase();
        const videos = await Video.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length===0){
            return NextResponse.json([], {status: 200})
        }

        return NextResponse.json(videos)
    }catch(err){
        return NextResponse.json(
            {err: "Failed to fetch videos"},
            {status: 500}                
        )
    }
}