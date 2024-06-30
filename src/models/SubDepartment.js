const mongoose = require('mongoose');
require('./Department')

const schema = new mongoose.Schema({
    title:{ type: String, required: true },
    department:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
})

const model = mongoose.models.subDepartment || mongoose.model('subDepartment', schema);
export default model;