import mongoose from "mongoose"

export const ConnectedDatabase = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL)
      console.log("connected to job Vista database")
   } catch (error) {
      console.log("Error while connected to database");
      console.error(error)
      process.exit(1);
   }
}
