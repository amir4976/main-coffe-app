import { isValidObjectId } from "mongoose";
import ConnectToDb from "../../../../../configs/db"
import subDepartmentModel from "../../../../models/SubDepartment"
export async function GET(req,{params}){
    try {
        ConnectToDb()
        console.log(params.id)
        const id = params.id;

        if(!isValidObjectId(id)){
            return Response.json({message:"id is not valid"},{status:400})
        }
        
        const SubDepartments = await subDepartmentModel.find({department:id})
        
        return Response.json(SubDepartments,{status:200})
    } catch (error) {
        return Response.json({message:"not ok"},{status:400})
    }
}