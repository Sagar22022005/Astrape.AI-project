const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// Create product (for demo you can call this from seed)
router.post("/", auth, async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
});

// Update product
router.put("/:id", auth, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(p);
});

// Delete product
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

// Get single
router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  res.json(p);
});

// List with filters: ?q=search&category=Shoes&min=10&max=200&page=1&limit=12&sort=price_asc
router.get("/", async (req, res) => {
  const { q, category, min, max, page = 1, limit = 12, sort } = req.query;
  const filter = {};
  if (q)
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  if (category) filter.categories = category;
  if (min || max) filter.price = {};
  if (min) filter.price.$gte = Number(min);
  if (max) filter.price.$lte = Number(max);

  let query = Product.find(filter);
  if (sort) {
    const map = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      newest: { createdAt: -1 },
    };
    query = query.sort(map[sort] || {});
  }
  const count = await Product.countDocuments(filter);
  const pageNum = Math.max(1, Number(page));
  query = query.skip((pageNum - 1) * Number(limit)).limit(Number(limit));
  const items = await query.exec();
  res.json({
    items,
    total: count,
    page: pageNum,
    pages: Math.ceil(count / limit),
  });
});

module.exports = router;
