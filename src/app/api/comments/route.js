import commentsModel from "../../../../models/comments";
import ConnectToDb from "../../../../configs/db";
import productModle from "../../../../models/Product";
export async function POST(req){
    try {
        ConnectToDb();
        const {
            username,
            email,
            body,
            score,
            productID
        } = await req.json();

        const createComments = await commentsModel.create({
            username,
            email,
            body,
            score,
            productID
        }) 


        const product = await productModle.findOneAndUpdate({_id:productID},{
            $push:{
                comments:createComments._id
            }
        })
        
        return Response.json({message:"comment created succses fully",Data:createComments},{status:201})

    }catch (error) {
        console.log(error)
        return Response.json({ message: "something went wrong", error }, { status: 500 });
    }



} 




export async function GET(){
    const comments =await commentsModel.find({},"-__v")
    return Response.json({comments},{status:200})
}