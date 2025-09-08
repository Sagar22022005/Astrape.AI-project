import React, { useEffect, useState } from "react";
import api from "../src/api/api";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Divider,
  Box,
  Paper,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      setCart({ items: [] });
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const remove = async (productId) => {
    await api.post("/cart/remove", { productId });
    fetchCart();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <Container sx={{ py: 8 }} className="relative z-10">
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(90deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🛒 Your Cart
        </Typography>

        {/* Empty State */}
        {cart.items.length === 0 ? (
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: 6,
              textAlign: "center",
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            <Typography variant="h6" gutterBottom color="gray.300">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="gray.500">
              Add some products to see them here.
            </Typography>
          </Paper>
        ) : (
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              p: 3,
              backgroundColor: "rgba(17, 24, 39, 0.85)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            {/* Cart Items */}
            <List>
              {cart.items.map((ci, index) => (
                <Fade in key={ci._id || ci.product._id}>
                  <div>
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 3,
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.05)",
                        },
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => remove(ci.product._id)}
                          sx={{
                            bgcolor: "rgba(239,68,68,0.8)",
                            color: "white",
                            "&:hover": { bgcolor: "rgba(220,38,38,1)" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      {/* Product Image */}
                      <Box
                        component="img"
                        src={
                          ci.product.image ||
                          "https://via.placeholder.com/60?text=No+Image"
                        }
                        alt={ci.product.name}
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 2,
                          mr: 2,
                          objectFit: "cover",
                          boxShadow: 3,
                        }}
                      />

                      {/* Product Details */}
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight={600}>
                            {ci.product.name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ color: "rgba(209,213,219,0.9)", mt: 0.5 }}
                          >
                            Qty: {ci.qty} × ₹{ci.product.price}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < cart.items.length - 1 && (
                      <Divider
                        sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.1)" }}
                      />
                    )}
                  </div>
                </Fade>
              ))}
            </List>

            {/* Checkout Button */}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                size="large"
                disabled
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  background:
                    "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(6,182,212,1) 100%)",
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </div>
  );
}
