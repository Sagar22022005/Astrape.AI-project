import React, { useState, useContext } from "react";
import api from "../src/api/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // <-- for showing error messages
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async () => {
    try {
      setError(""); // clear previous errors
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      nav("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Check your credentials."
      );
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gray-950"
      sx={{ py: 8 }}
    >
      <Container
        maxWidth="sm"
        sx={{
          p: 6,
          bgcolor: "#1f1f1f",
          borderRadius: 4,
          boxShadow: 8,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4, color: "white" }}
        >
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          sx={{
            mb: 3,
            input: { color: "white" },
            label: { color: "gray" },
            "& .MuiOutlinedInput-root": {
              bgcolor: "#2c2c2c",
              borderRadius: 2,
              "&:hover fieldset": { borderColor: "#6b46c1" },
              "&.Mui-focused fieldset": { borderColor: "#6b46c1" },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{
            mb: 4,
            input: { color: "white" },
            label: { color: "gray" },
            "& .MuiOutlinedInput-root": {
              bgcolor: "#2c2c2c",
              borderRadius: 2,
              "&:hover fieldset": { borderColor: "#6b46c1" },
              "&.Mui-focused fieldset": { borderColor: "#6b46c1" },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 3,
            bgcolor: "purple.600",
            "&:hover": { bgcolor: "purple.700" },
          }}
          onClick={submit}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
}
