import { cookies } from "next/headers";
import ConnectToDb from "../../../../../configs/db";
import { verifyToken } from "@/utils/auth";
import userModel from "../../../../models/User";
export async function GET(req) {
    ConnectToDb()
    const Token = cookies().get("Token")?.value
    let User = null
    console.log(Token)
    if(Token){
       const tokenPayload = await verifyToken(Token)
       console.log(tokenPayload)
       if(tokenPayload){
           User = await userModel.findOne({email:tokenPayload.email},"-password -__v -refreshToken") 
           console.log(User)
        return Response.json({User}, {status:200})
       }

       return Response.json({error:"token is not valid"})
    
    }else{
        return Response.json({error:"not access!!!!"} , {status:401})
    }
}