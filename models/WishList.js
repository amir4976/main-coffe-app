const mongoose = require('mongoose');
require("./User")
require("./Product")

const schema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
    ,
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    }
},
{
    timestamps: true,
})


const modle = mongoose.models.WishList|| mongoose.model('WishList', schema);


export default modle;