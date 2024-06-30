import ConnectToDb from "../../../../configs/db"
import DepartmentModel from '../../../models/Department'
export async function POST(req){
    try {
        ConnectToDb()
        const body = await  req.json();
        const {title} = body;

        await DepartmentModel.create({title})
        return Response.json({message:"ok"},{status:200})
        
    } catch (error) {
        return Response.json({message:"not ok"},{status:400})
    }
}


export async function GET(req){
    try {
        ConnectToDb()
        const departments = await DepartmentModel.find({})
        return Response.json(departments,{status:200})
    } catch (error) {
        return Response.json({message:"not ok"},{status:400})
    }
}