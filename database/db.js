import mongoose from 'mongoose';



const Connection = async () => {
    try{
        const url="mongodb+srv://samarimam78:w4bCFhKWO9qVmDCO@cluster0.saxpk.mongodb.net/mernblog?retryWrites=true&w=majority";
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
        console.log('Database connected succesfully');
} catch(error) {
        console.log("Error while connecting to MongoDB", error);
    }
}

export default Connection;