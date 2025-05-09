
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart?retryWrites=true&w=majority`)
    }
    catch(error){
        console.error(error.message);
        console.error(error.message);
    }
}

export default connectDB;



// import mongoose from "mongoose";
// import 'dotenv/config';

// const connectDB = async () => {
//     try {
//         // Correct way: Pass the function reference
//         mongoose.connection.on('connected');

//         await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//         process.exit(1); // Exit process with failure
//     }
// }

// export default connectDB;