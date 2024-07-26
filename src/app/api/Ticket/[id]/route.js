import ConnectToDb from "../../../../../configs/db";
import Tickets from '@/models/Tickets'

export async function DELETE(rea,{params}){
    try{
    ConnectToDb()
    const findTicket = await Tickets.find({_id:params.id})
    if(!findTicket){
        return Response.json({"error":"error"},{status:500})
    }
    const ticket = await Tickets.findByIdAndDelete(params.id)
    return Response.json({"success":"success"},{status:200})

    }catch(error){
        return Response.json({"error":"error"},{status:500})
    }
}
