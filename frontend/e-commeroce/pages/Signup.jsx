import React, { useState, useContext } from "react";
import api from "../src/api/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async () => {
    const res = await api.post("/auth/signup", form);
    login(res.data.user, res.data.token);
    nav("/");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0d0d0d, #1a1a2e)", // same as login
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            background: "rgba(25, 25, 25, 0.95)",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.9)",
            textAlign: "center",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: "bold",
              color: "#9c27b0",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Create Account
          </Typography>
          <Typography
            sx={{ mb: 4, color: "#bbb", fontFamily: "'Poppins', sans-serif" }}
          >
            Please sign up to continue
          </Typography>

          {/* Name Input */}
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={{
              mt: 2,
              input: {
                color: "#000",
                background: "#f5f5f5",
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
                "& fieldset": { borderColor: "#999" },
                "&:hover fieldset": { borderColor: "#9c27b0" },
                "&.Mui-focused fieldset": { borderColor: "#9c27b0" },
              },
              "& .MuiInputLabel-root": { color: "#555" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#9c27b0" },
            }}
          />

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{
              mt: 3,
              input: {
                color: "#000",
                background: "#f5f5f5",
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
                "& fieldset": { borderColor: "#999" },
                "&:hover fieldset": { borderColor: "#9c27b0" },
                "&.Mui-focused fieldset": { borderColor: "#9c27b0" },
              },
              "& .MuiInputLabel-root": { color: "#555" },
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
              input: {
                color: "#000",
                background: "#f5f5f5",
                borderRadius: "10px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#f5f5f5",
                "& fieldset": { borderColor: "#999" },
                "&:hover fieldset": { borderColor: "#9c27b0" },
                "&.Mui-focused fieldset": { borderColor: "#9c27b0" },
              },
              "& .MuiInputLabel-root": { color: "#555" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#9c27b0" },
            }}
          />

          {/* Signup Button */}
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
            SIGN UP
          </Button>
        </Container>
      </Box>
    </>
  );
}
