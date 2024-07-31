import ConnectToDb from "../../../../../configs/db";
import Discount from "@/models/Discount";
export async function PUT (req){
try {
    ConnectToDb()
    const body = await req.json();
    const {code} = body;
    const discount = await Discount.findOne({code});
    //as you see we find the discount by code and then we check if it is valid or not
    //first we check if the discount is valid or not
    if(!discount){
        return Response.json({
            message: "کد تخفیف وارد شده معتبر نیست"
        },{status: 404, headers: {'Content-Type': 'application/json'}})
    }else if(discount.uses >= discount.maxUse){
        // then we check if the discount uses is equal to max use or not 
        // if it is equal to max use then we return a message
        return Response.json({
            message: "کد تخفیف استفاده شده است"
        },{status: 422, headers: {'Content-Type': 'application/json'}})
    }else{
        // if it is not equal to max use then we will update the uses and return the discount
        await discount.updateOne({$inc: {uses: 1}})
       return Response.json(discount)     
    }   
    
} catch (error) {
    return Response.json({
        message: error.message
    },{status: 500, headers: {'Content-Type': 'application/json'}})
}
}
