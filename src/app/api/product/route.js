import { NextResponse } from "next/server";
import ConnectToDb from "../../../../configs/db";
import productModel from "../../../../models/Product";

export async function POST(req){
    try {
        ConnectToDb();
    const {
        name,
        price,
        shortDescription,
        longDesciption,
        weight,
        suitableFor,
        smell,
        Tags,
    }= await req.json();

    const isProductExist = await productModel.findOne({name:name});
    if(isProductExist){
        return Response.json({message:'product already exist'},{status:400})
    }

    const product = await productModel.create({
        name,
        price,
        shortDescription,
        longDesciption,
        weight,
        suitableFor,
        smell,
        Tags,
    });

    return NextResponse.json({message:'product created succses fully',data:product},{status:201});
    } catch (error) {
    return NextResponse.json({message:'something went wrong',error},{status:500})
    }
    
}



export async function GET(req){
    try{
        ConnectToDb()
        const product = await productModel.find({}).populate('comments')
        return Response.json({product},{status:200})
    }catch(error){
        return Response.json({message:'something went wrong',error},{status:500})
    }
}



