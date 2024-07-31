import { authAdmin } from "@/utils/AuthUser";
import ConnectToDb from "../../../../../configs/db";
import CommentModel from "@/models/Comments";
export async function POST(req) {
  try {
    const isAdmin = await authAdmin()
    if (!isAdmin) return Response.json({ message: "not authorized,route protected" });

    await ConnectToDb();
    const { id } = await req.json();
    const findComment = await CommentModel.findOne({ _id: id });
    if (!findComment) return Response.json({ message: "not found" });
    const findCommentAndUpdate = await CommentModel.findOneAndUpdate(
      { _id: id },
      { isAccepted: true },
      { new: true }
    );
    return Response.json({ Massage: "success fully Accepted!!!" });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
