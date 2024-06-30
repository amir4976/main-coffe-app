
import ConnectToDb from "../../../../configs/db";
import wishList from "../../../models/WishList";
import userModel from "../../../models/User";
import { NextResponse } from "next/server";
export async function POST(req, res) {
   try {
    ConnectToDb()
    const body= await req.json();
    const {user ,product} =body
    const isUserExist = await userModel.findOne({_id:user})
    if(!isUserExist){
        return NextResponse.json('user is not exist')
    }
    const isProductExist = await wishList.findOne({product:product})
    if(isProductExist){
        return NextResponse.json('product is exist')
    }
    const newWishList = await wishList.create({
        user:user,
        product:product
    })

    const updateUser = await userModel.findOneAndUpdate({_id:user},{$push:{wishList:newWishList._id}})
    return NextResponse.json('success')
   } catch (error) {
    return NextResponse.json('error'+error)
   }
}

export async function GET(){
        const AllWishList = await wishList.find({}).populate('user').populate('product')
        return NextResponse.json(AllWishList)
}

