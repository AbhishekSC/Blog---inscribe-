import mongoose from "mongoose";

async function connectToMongoDB(MONGO_URI) {
  try {
    const client = await mongoose.connect(MONGO_URI);

    console.log("****Successfully connected to MongoDB****");
    return client;
  } catch (error) {
    console.error("****Error connecting to MongoDB:", error);
  }
}

export { connectToMongoDB };
