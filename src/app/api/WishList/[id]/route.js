import ConnectToDb from "../../../../../configs/db"
import WishListModel from "../../../../models/WishList"
import { authUser } from "@/utils/AuthUser";
export async function GET(req,{params}){
    try {
        ConnectToDb();
        const {id}=params;
        const Product = await WishListModel.findOne({_id:id}).populate('product');
        console.log(Product)
        return Response.json(Product)
    } catch (error) {
        return Response.json('product not found')
    }
}

export async function DELETE(req,{params}){
    try {
        ConnectToDb();
        const user = await authUser();
        console.log(user.id)
        const {id}=params;
        console.log(id)
        const wishlist = await WishListModel.findOne({user:user.id});
        if(!wishlist){
            return Response.json('wishlist not found')
        }
        await WishListModel.findOneAndDelete({_id:id});

        return Response.json('product deleted')
    } catch (error) {
        return Response.json('product not deleted')
        
    }
}