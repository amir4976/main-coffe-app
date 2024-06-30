import ConnectToDb from "../../../../configs/db";
import userModel from "../../../models/User";
export async function POST(req) {
    ConnectToDb();
    try {
        const body = await req.json();

        const { name, email, phone } = body;

        const findUser = await userModel.findOne({ email });

      
        await userModel.findOneAndUpdate(
          { _id: findUser._id },
          {
            $set: {
              name,
              email,
              phone,
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
