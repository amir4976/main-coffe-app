const mongoose = require("mongoose");
require("./Product");
const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        // user cant find and update the Date
        immutable: true
    },
    //relation to product 
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    isAccepted:{
        type: Boolean,
        default: false
    }
    // user:{
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: false

    // }
})

const modle =  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default modle;
