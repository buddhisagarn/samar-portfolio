import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./Models/admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin123", 10);
const password = "Admin123"
 const data = await Admin.create({
  email: "admin@gmail.com",
  password
});
console.log(data)

console.log("Admin created successfully");
process.exit();
