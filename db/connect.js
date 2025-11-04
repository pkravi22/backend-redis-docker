import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connnection successful");
  } catch (err) {
    console.log("error while connecting to mongodb", err);
  }
};
export default connectDb;
