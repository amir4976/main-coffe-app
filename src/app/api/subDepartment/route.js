import ConnectToDb from "../../../../configs/db";
import SubDepartmentModel from "../../../models/SubDepartment";
export async function POST (req){
    try {
        ConnectToDb()
        const body = await req.json();
        const {title,department} = body;
        console.log(department)
        await SubDepartmentModel.create({title,department})
        return Response.json({message:"ok"},{status:200})
    } catch (error) {
        return Response.json({message:"ok"},{status:400})
        
    }
}

export async function GET (req){
    try {
        ConnectToDb()
        const subDepartments = await SubDepartmentModel.find({}).populate("department")
        return Response.json(subDepartments,{status:200})
    } catch (error) {
        return Response.json({message:"not ok"},{status:400})
    }
}