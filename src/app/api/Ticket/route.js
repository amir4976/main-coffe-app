import Tickets from "@/models/Tickets";
import ConnectToDb from "../../../../configs/db";

// export function GET(){
//     ConnectToDb()

// }

export async function POST(req){
    ConnectToDb()
    const request = await req.json();
    console.log(request)
    
    const tickets =await Tickets.create(
        request
    )
    console.log(tickets);

    return Response.json({"success":"successes"},{status:200})
}