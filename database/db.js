import mongoose from 'mongoose';



const Connection = async (url) => {
    try{
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true});
        console.log('Database connected succesfully');
} catch(error) {
        console.log("Error while connecting to MongoDB", error);
    }
}

export default Connection;