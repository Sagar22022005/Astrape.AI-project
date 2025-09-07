import React, { useState, useContext } from "react";
import api from "../src/api/api";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async () => {
    const res = await api.post("/auth/login", form);
    login(res.data.user, res.data.token);
    nav("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)", // Darker gradient
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          background: "rgba(20, 20, 20, 0.95)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: "bold",
            color: "#9c27b0",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          sx={{ mb: 4, color: "#aaa", fontFamily: "'Poppins', sans-serif" }}
        >
          Please login to continue
        </Typography>

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          sx={{
            mt: 2,
            input: { color: "peach", background: "transparent" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              backgroundColor: "rgba(39, 44, 2, 0.05)",
              "& fieldset": { borderColor: "#613131ff" },
              "&:hover fieldset": { borderColor: "#9c27b0" },
              "&.Mui-focused fieldset": { borderColor: "#9c27b0" },
            },
            "& .MuiInputLabel-root": { color: "#c0cd00ff" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#9c27b0" },
          }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{
            mt: 3,
            input: { color: "white", background: "transparent" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              backgroundColor: "rgba(255,255,255,0.05)",
              "& fieldset": { borderColor: "#444" },
              "&:hover fieldset": { borderColor: "#9c27b0" },
              "&.Mui-focused fieldset": { borderColor: "#9c27b0" },
            },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#9c27b0" },
          }}
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: "12px",
            background: "linear-gradient(90deg, #9c27b0, #6a1b9a)",
            fontWeight: "bold",
            fontSize: "16px",
            fontFamily: "'Poppins', sans-serif",
            "&:hover": {
              background: "linear-gradient(90deg, #6a1b9a, #4a148c)",
            },
          }}
          onClick={submit}
        >
          LOGIN
        </Button>
      </Container>
    </Box>
  );
}
