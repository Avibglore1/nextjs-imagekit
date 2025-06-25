import { connectToDatabase } from "@/utils/db";
import User from "@/models/User";
import { NextRequest,NextResponse } from "next/server";
import { error } from "console";

export async function POST(request:NextRequest){
    try{
        const {email,password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: 'Email and Password required'},
                {status: 400}
            )
        }
        await connectToDatabase();
        const existingUser=await User.findOne({email});
        if(existingUser){
             return NextResponse.json(
                {error: 'User already registered'},
                {status: 400}
            )
        }

        await User.create({
            email,password
        })
         return NextResponse.json(
                {error: 'User registered successfully'},
                {status: 200}
            )
    }catch(err){
         console.error("Registration Error", err)
         return NextResponse.json(
                {error: 'Failed to register User'},
                {status: 400}
            )
    }
}