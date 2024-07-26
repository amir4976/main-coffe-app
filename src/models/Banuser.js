const mongoose= require('mongoose')


const BanUserSchema = new mongoose.Schema({
    phone:{
        type:"String",
        required:false
    },
    email:{
        type:"String",
        required:false
    }
},{
    timestamps:true
})


export default mongoose.models.BANUSER || mongoose.model('BANUSER',BanUserSchema)