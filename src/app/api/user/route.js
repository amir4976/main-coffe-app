import ConnectToDb from "../../../../configs/db";
import userModel from "../../../models/User";

export async function GET() {
    ConnectToDb();
    try {
        const finduser = await userModel.find();
        return Response.json(finduser)
    }catch (error) {
        return Response.json('error',{status : 500})
    }   
};



export async function POST(req) {
    ConnectToDb();
    try {
        const body = await req.json();

        const {id, name, email, phone,role } = body;
        console.log(id, name, email, phone,role)

      
        await userModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name,
              email,
              phone,
              role,
            },
          }
        );

        return new Response(JSON.stringify({ message: "success" }), {
          status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), {
          status: 400,
        });
    }
}

export async function DELETE(req) {
    ConnectToDb();
    try {
        const body = await req.json();
        const { id } = body;
        await userModel.deleteOne({ _id: id });
        return Response.json('successfully deleted',{status : 200})
    }catch (error) {
        return new Response(JSON.stringify({ message: error }), {
          status: 400,
        });
    }
}