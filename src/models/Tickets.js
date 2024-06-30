const mongoose = require('mongoose');
require('./Department')
require('./SubDepartment')
const schema = new mongoose.Schema({
    title:{ type: String, required: true },
    body:{ type: String, required: true },
    department:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    subDepartment:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'SubDepartment'
    },
    priority:{
        type:Number,
        default:1,
        enum:[1,2,3]
    },
    userID:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hasAnswer:{
        type:Boolean,
        default:false
    },
    isAnswer:{
        type:Boolean,
        default:false
    },
    mainTicket:{
        type :mongoose.Types.ObjectId,
        reg:"Ticket",
        require:false
    }
}
,{ timestamps: true }
)

const model = mongoose.models.Ticket || mongoose.model('Ticket', schema);
export default model