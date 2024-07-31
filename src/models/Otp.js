const {Schema,Mongoose} = require('mongoose');


const OTPSchema = Schema({
    Phone:{
        type:String,
        default:"کاربر"
    },
    code:{
        type:String,
        required:true
    },
    ExpTime:{
        type:Number,
        required:true
    }
});
const Otp = Mongoose.models.OTP|| Mongoose.model('OTP',OTPSchema);