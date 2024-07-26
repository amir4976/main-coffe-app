import { authUser } from "@/utils/AuthUser";
import TicketModel from "@/models/Tickets";

export async function POST(req){
    const request = await req.json();
    const {title,body,department,subDepartment,priority,ticketID} = request;
    const user = await authUser();
    console.log({title,body,department,subDepartment,priority,ticketID})
    await TicketModel.create({
        title,
        body,
        department,
        subDepartment,
        priority,
        userID:user._id,
        ticketID,
        hasAnswer:false,
        isAnswer:true,
        mainTicket:ticketID
    })
   const sss =  await TicketModel.findOneAndUpdate({_id:ticketID},{hasAnswer:true})
    console.log(sss) 
   return Response.json({"success":"success"},{status:200})
}