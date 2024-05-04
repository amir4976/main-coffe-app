const mongoose = require ('mongoose');

const ConnectToDb = async () =>{
    try {
        if(mongoose.connection.readyState === 0){
            await mongoose.connect(process.env.MONGO_URL);
        }
        console.log('connection to db established 😁😀');
    }
    catch (error) {
        console.log(error);
    }

}


export default ConnectToDb;