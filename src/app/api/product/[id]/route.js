import ConnectToDb from "../../../../../configs/db";
import productModel from "../../../../models/Product";

// get one product
export async function GET(req,{params}) {
  ConnectToDb();
  const product = await productModel.findOne({_id:params.id});
  return Response.json({ product }, { status: 200 });
}

// update
export async function PUT(req,{params}) {
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
        } = await req.json();
        
        const product = await productModel.findOneAndUpdate({ _id: params.id },{
            name,
            price,
            shortDescription,
            longDesciption,
            weight,
            suitableFor,
            smell,
            Tags,
        });
        return Response.json({ message: "product updated succses fully", data: product }, { status: 200 });

    }catch (error) {
        return Response.json({ message: "something went wrong", error }, { status: 500 });
    }
}

// delete 
export async function DELETE(req,{params}){
    try {
        ConnectToDb()
        const DeletedProduct = await productModel.findOneAndDelete({_id:params.id})
        return Response.json({message:"product deleted succses fully"},{status:200})
    } catch (error) {
        
    }
}

// bad requset
export function POST() {
    console.log('object')
    try {
        return Response.json({ message: "bad request"}, { status: 500 });
    } catch (error) {
        return Response.json({ message: "bad request"}, { status: 500 });
        
    }
}