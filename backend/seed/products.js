const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Noise-cancelling over-ear headphones with 30 hours of battery life.",
    price: 79.99,
    category: "Electronics",
    image: "https://via.placeholder.com/200x200?text=Headphones",
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic RGB gaming mouse with 7 programmable buttons.",
    price: 39.99,
    category: "Electronics",
    image: "https://via.placeholder.com/200x200?text=Mouse",
  },
  {
    name: "Running Shoes",
    description: "Lightweight breathable running shoes for men and women.",
    price: 59.99,
    category: "Footwear",
    image: "https://via.placeholder.com/200x200?text=Shoes",
  },
  {
    name: "Smartwatch",
    description: "Fitness tracking smartwatch with heart rate monitor.",
    price: 129.99,
    category: "Electronics",
    image: "https://via.placeholder.com/200x200?text=Smartwatch",
  },
  {
    name: "Backpack",
    description: "Durable waterproof backpack with laptop compartment.",
    price: 49.99,
    category: "Accessories",
    image: "https://via.placeholder.com/200x200?text=Backpack",
  },
  {
    name: "Classic White T-Shirt",
    description: "100% cotton unisex white t-shirt.",
    price: 14.99,
    category: "Clothing",
    image: "https://via.placeholder.com/200x200?text=T-Shirt",
  },
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with 12-cup capacity.",
    price: 89.99,
    category: "Home Appliances",
    image: "https://via.placeholder.com/200x200?text=Coffee+Maker",
  },
  {
    name: "Office Chair",
    description: "Ergonomic mesh office chair with adjustable height.",
    price: 159.99,
    category: "Furniture",
    image: "https://via.placeholder.com/200x200?text=Office+Chair",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
