import Banuser from "@/models/Banuser";
import ConnectToDb from "../../../../../configs/db";
import userModel from "@/models/User";

export async function POST(req) {
        await ConnectToDb();
        const {phone,email} = await req.json();
        console.log(phone,email)
        if( !phone &&!email){
            return Response.json({
                message: "phone or email is required"
            },{status:422})
        }

        const isUserExist = await Banuser.findOne({$or: [{email:email},{phone:phone}] });
        if(isUserExist){
            return Response.json({
                message: "User already exist"
            },{status:422})
        }

        const banuser =await Banuser.create({
            phone,
            email
        })

        return Response.json({
            message: "user banned successfully",
        },{status:201})

}