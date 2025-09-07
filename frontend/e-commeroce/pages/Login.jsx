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

// Dark theme with custom font
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0a", // deep black
    },
    primary: {
      main: "#ff0080", // neon pink
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Montserrat', 'Roboto', sans-serif",
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
            "radial-gradient(circle at top left, #1a1a1a, #0a0a0a 60%)",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={12}
            sx={{
              p: 6,
              borderRadius: "30px",
              backdropFilter: "blur(14px)",
              backgroundColor: "rgba(20, 20, 20, 0.9)",
              border: "2px solid rgba(255,0,128,0.3)",
              boxShadow:
                "0px 0px 20px rgba(255,0,128,0.4), inset 0px 0px 15px rgba(255,0,128,0.1)",
              transition: "0.3s",
              "&:hover": {
                boxShadow:
                  "0px 0px 35px rgba(255,0,128,0.6), inset 0px 0px 20px rgba(255,0,128,0.2)",
              },
            }}
          >
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 800,
                letterSpacing: "1px",
                background: "linear-gradient(45deg, #ff0080, #7928ca)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              align="center"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontSize: "1rem",
                fontWeight: 400,
              }}
            >
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
                  borderRadius: "15px",
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#ff0080" },
                  "&.Mui-focused fieldset": { borderColor: "#ff0080" },
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
                mt: 3,
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#ff0080" },
                  "&.Mui-focused fieldset": { borderColor: "#ff0080" },
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 5,
                py: 1.5,
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                letterSpacing: "1px",
                background: "linear-gradient(45deg, #ff0080, #7928ca)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "0px 0px 25px rgba(255,0,128,0.7)",
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
