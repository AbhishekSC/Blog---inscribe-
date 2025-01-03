import mongoose from "mongoose";

// const uri = "mongodb+srv://rams31824:ram@123@cluster0.k9ud9.mongodb.net/";
// const username = "rams31824";
// const password = "ram@123";
// const cluster = "cluster0.k9ud9.mongodb.net";
// const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster}/`;

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
