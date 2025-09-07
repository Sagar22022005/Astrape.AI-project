require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const User = require("../models/User");
const connectDB = require("../config/db");

async function seed() {
  await connectDB(process.env.MONGO_URI);
  await Product.deleteMany({});
  await User.deleteMany({});
  const products = [
    {
      title: "Blue Hoodie",
      description: "Comfy hoodie",
      price: 39.99,
      categories: ["Clothing"],
    },
    {
      title: "Running Shoes",
      description: "Lightweight",
      price: 89.99,
      categories: ["Footwear"],
    },
    {
      title: "Wireless Headphones",
      description: "Noise cancelling",
      price: 129.99,
      categories: ["Electronics"],
    },
    {
      title: "Coffee Mug",
      description: "Ceramic mug",
      price: 9.99,
      categories: ["Home"],
    },
  ];
  await Product.insertMany(products);
  const pass = await bcrypt.hash("password123", 10);
  await User.create({
    name: "Admin",
    email: "admin@example.com",
    passwordHash: pass,
  });
  console.log("seeded");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
