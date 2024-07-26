 import ConnectToDb from "../../../../../configs/db";
 import { NextResponse } from "next/server";
import userModel from "../../../../models/User";
import { hashPassword , genrateToken } from "@/utils/auth";
import { roles } from "@/utils/constants";

 export async function GET(req, res) {
     await ConnectToDb();
     return NextResponse.json({
         message: "Connected to db"
     })
}

export async function POST(req, res) {
     await ConnectToDb();

    // get data from client
     const {name,email,phone,password} = await req.json();
     // validation 
     const isUserExist = await userModel.findOne({$or: [{email:email},{phone:phone},{name:name}] });
     if(isUserExist){
         return NextResponse.json({
             message: "User already exist"
         },{status:422})
    }

    const hashedPassword = await hashPassword({password});
    
    const accessToken = await genrateToken({name});
    
    const Users = await userModel.find({});
   


    const createdUser = await userModel.create({
        name,
        email,
        phone,
        password:hashedPassword,
        role: Users.length > 0 ? roles.USER : roles.ADMIN,
    })



     return NextResponse.json({
         message: "user created successfully",
     },{status:201,
        headers:{
            "Set-cookie": `Token=${accessToken}; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=604800`,
        }
     })
}