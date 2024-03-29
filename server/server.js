// server.js
import { app } from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./utils/db.js";
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// create server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is connected with port ${PORT}`);
  connectDB();
});
