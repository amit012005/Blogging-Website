import express from "express";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

//MONGODB Connection
const url = process.env.MONGO_URI;
connectDB().catch((err) => console.log(err));
async function connectDB() {
  await mongoose.connect(url);
  console.log(`Blog database connected Successfully to ${url}`);
}

//Server starting
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
