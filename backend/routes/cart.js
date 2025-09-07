const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");

// get cart for user
router.get("/", auth, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
    cart = await cart.populate("items.product");
  }
  res.json(cart);
});

// add/update item
router.post("/add", auth, async (req, res) => {
  const { productId, qty = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const idx = cart.items.findIndex((i) => i.product.toString() === productId);
  if (idx > -1) {
    cart.items[idx].qty += Number(qty);
    if (cart.items[idx].qty <= 0) cart.items.splice(idx, 1);
  } else {
    cart.items.push({ product: productId, qty: Number(qty) });
  }

  await cart.save();
  cart = await cart.populate("items.product");
  res.json(cart);
});

// remove item
router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.json({ items: [] });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  cart = await cart.populate("items.product");
  res.json(cart);
});

module.exports = router;
