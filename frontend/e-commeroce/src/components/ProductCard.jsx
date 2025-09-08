import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
} from "@mui/material";
import api from "../api/api";

export default function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        productId: product._id,
        qty: 1,
      });
      // Removed alert
    } catch (err) {
      console.error("Add to cart failed:", err);
      // Removed alert
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#1e1e2f",
        color: "#fff",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.35)",
        },
        maxWidth: 320,
        margin: "auto",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={
            product.image || "https://via.placeholder.com/220x220?text=No+Image"
          }
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        {/* Badge if trending or new */}
        {product.isNew && (
          <Chip
            label="New"
            color="secondary"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: 600,
              bgcolor: "secondary.main",
              color: "#fff",
              borderRadius: "6px",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "rgba(255,255,255,0.7)",
            minHeight: "40px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description || "No description available."}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ color: "#a78bfa", fontWeight: 700 }}>
            ₹{product.price}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 1,
              background: "linear-gradient(90deg, #7e22ce, #2563eb)",
              boxShadow: "0 4px 10px rgba(126,34,206,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #6d28d9, #1d4ed8)",
                boxShadow: "0 6px 14px rgba(126,34,206,0.5)",
              },
            }}
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
