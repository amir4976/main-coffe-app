import ConnectToDb from "../../../../../configs/db";
import userModel from '@/models/User'

 export async function GET(req,{params}) {
    ConnectToDb();
    try {
        const id = params.id;
        const finduser = await userModel.findOne({ _id : id });
        console.log(finduser)
        const UpdateUser = await userModel.findOneAndUpdate({ _id : id },{
            $set: {
                role : finduser.role === "USER"? "ADMIN" : "USER",
            },
        });

        console.log(UpdateUser)
        return Response.json('success')
    }catch (error) {
        return Response.json('error',{status : 500})
    }
}