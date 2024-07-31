import { NextResponse } from "next/server";
import ConnectToDb from "../../../../configs/db";
import productModel from "../../../models/Product";
import path from "path";
import { writeFile } from "fs/promises";
export async function POST(req){
    try {
    ConnectToDb();
    const {
        name,
        price,
        shortDescription,
        longDescription,
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
        longDescription,
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

export async function PUT(req) {
    const DataForm = await req.formData();
    const img = await DataForm.get('img')
    

    const fileBuffer =Buffer.from(await img.arrayBuffer())
    const fileName = Date.now() + img.name
    const fileRoute = path.join(process.cwd(),"public/upload",fileName)
    console.log(fileBuffer)
    await writeFile(fileRoute ,fileBuffer)
    return NextResponse.json({message:'product updated succses fully'},{status:200})
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



