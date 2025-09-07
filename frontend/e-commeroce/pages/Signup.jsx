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
      default: "#0a0a0a", // pure dark background
      paper: "#121212", // slightly lighter card
    },
    primary: {
      main: "#bb86fc", // soft purple (Google dark theme style)
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "background.paper",
              boxShadow: "0px 0px 15px rgba(0,0,0,0.9)",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Sign up
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              sx={{ mt: 2, input: { color: "white" } }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{ mt: 2, input: { color: "white" } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{ mt: 2, input: { color: "white" } }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                borderRadius: 2,
                backgroundColor: "primary.main",
                color: "#0a0a0a",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#9d6dff",
                },
              }}
              onClick={submit}
            >
              Sign up
            </Button>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
