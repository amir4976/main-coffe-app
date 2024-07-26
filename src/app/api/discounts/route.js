import ConnectToDb from "@/../configs/db";
import DiscountModel from "@/models/Discount";
export async function POST (req){
    try {
        ConnectToDb()
        const {code ,persent ,maxUse,product} =await req.json();
        console.log({code ,persent ,maxUse,product});
        const discount = await DiscountModel.create({code,persent,maxUse,product,uses:0});
        console.log("سسسس")
        return Response.json({"massage":"Discount created"},{status:201});
    } catch (error) {
        return Response.json({"massage":error.message});
    }
}
