import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
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
app.use(cors());
const PORT = process.env.PORT;
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
