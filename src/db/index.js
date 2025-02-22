import mongoose from 'mongoose'
/* if facing issue in connecting db use this import dotenv from 'dotenv';
dotenv.config();  // Loads variables from the .env file
*/
import {Db_Name} from '../Constants.js'


const connectDb = async () => { 
    try {
      const connectionInstance=  await mongoose.connect
      (`${process.env.MONGODB_URI}/${Db_Name}`)
        console.log(`\n mongodb connected: ${connectionInstance.connection.host}`);
       // console.log(connectionInstance);

    } catch(error){
        console.log("mongodb connection error failed",error);
        process.exit(1);
    }
   

}
export default connectDb