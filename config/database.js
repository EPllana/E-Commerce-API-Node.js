import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database Connected Successfully");
  } catch (error) {
    console.error("❌ Error Connecting to Database:", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
