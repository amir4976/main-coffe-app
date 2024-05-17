import ConnectToDb from "../../../../configs/db";
import contactModel from '../../../../models/Contact';
export async function POST(req) {
  try {
    ConnectToDb();
    const Body = await req.json();
    const { name, email, company, phone, message } = Body;
    console.log(Body)
    const res = await contactModel.create({ name, email, company, phone, message })
    return Response.json({msg:"msg saved successfully"},{status:201})
  } catch (error) {
    return Response.json({msg:"msg not saved"+error},{status:500})
  }
}


export function GET(req) {
  return Response.json({ msg: "GET" });
}
