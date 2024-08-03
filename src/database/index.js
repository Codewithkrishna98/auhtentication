import mongoose from "mongoose";

const dbConnection = async ()=>{
  try {
     const connected = await mongoose.connect(process.env.DB_URL)
     console.log(`database is connected ${connected.connection.host}`)
  } catch (error) {
    console.log("database connection failed ", error);
  }
}
export default dbConnection