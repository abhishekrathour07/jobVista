import mongoose from "mongoose"

export const ConnectedDatabase = async () => {
   try {
      console.log("Attempting to connect to MongoDB...");
      console.log("MONGO_URL:", process.env.MONGO_URL ? "URL is set" : "URL is NOT set");
      
      await mongoose.connect(process.env.MONGO_URL)
      console.log("✅ Successfully connected to Job Vista database")
   } catch (error) {
      console.log("❌ Error while connecting to database");
      console.error("MongoDB Error:", error.message);
      console.error("Full error:", error);
      process.exit(1);
   }
}
