import mongoose from "mongoose";

const dbConnection = async ()=>{
  try {
     const connected = await mongoose.connect("mongodb+srv://monu:mg6677@cluster3.5eudgqq.mongodb.net/")
     console.log(`database is connected ${connected.connection.host}`)
  } catch (error) {
    console.log("database connection failed ", error);
  }
}
export default dbConnection