import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "./pages/Signup";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(17, 24, 39, 0.7)", // semi-transparent dark
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar>
          {/* Brand */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: "linear-gradient(90deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Astrape
          </Typography>

          {/* Nav Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Products
            </Button>
            <Button
              component={Link}
              to="/cart"
              sx={{
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Cart
            </Button>

            {user ? (
              <>
                <Button
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  {user.name}
                </Button>
                <Button
                  onClick={logout}
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(239,68,68,1), rgba(220,38,38,0.8))",
                    color: "white",
                    px: 2.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, rgba(220,38,38,1), rgba(239,68,68,0.9))",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    background:
                      "linear-gradient(90deg, rgba(168,85,247,1), rgba(6,182,212,1))",
                    color: "white",
                    px: 2.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, rgba(147,51,234,1), rgba(14,165,233,1))",
                    },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
