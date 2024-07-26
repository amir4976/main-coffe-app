
const mongoose  = require("mongoose");

const schema = mongoose.Schema({
    code:{
        type:String,
        required:true
    }
    ,persent:{
        type:Number,
        required:true
    },
    maxUse:{
        type:Number,
        required:true,
    },
    uses:{
        type:Number,
        default:0
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    }
},{timestamps:true})


export default mongoose.models.Discount || mongoose.model('Discount',schema)
