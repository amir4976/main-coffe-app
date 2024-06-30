const mongoose = require ('mongoose');


const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default:'user'
    },
    refreshToken: {
        type: String
        
    }


    
})


export default mongoose.models.User || mongoose.model('User',userSchema)