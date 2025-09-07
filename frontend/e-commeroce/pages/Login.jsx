import React, { useState, useContext } from "react";
import api from "../src/api/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a", // full dark background
    },
    primary: {
      main: "#8e2de2", // purple-pink gradient color
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #141E30)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 12s ease infinite",
          "@keyframes gradientBG": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              p: 5,
              borderRadius: 4,
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(18,18,18,0.85)",
              boxShadow: "0px 8px 40px rgba(0,0,0,0.6)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(45deg, #8e2de2, #4a00e0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </Typography>
            <Typography align="center" sx={{ mb: 3, color: "text.secondary" }}>
              Please login to continue
            </Typography>

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{
                mt: 2,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#8e2de2" },
                  "&.Mui-focused fieldset": { borderColor: "#8e2de2" },
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{
                mt: 2,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#8e2de2" },
                  "&.Mui-focused fieldset": { borderColor: "#8e2de2" },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                background: "linear-gradient(45deg, #8e2de2, #4a00e0)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 20px rgba(142,45,226,0.6)",
                },
              }}
              onClick={submit}
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
