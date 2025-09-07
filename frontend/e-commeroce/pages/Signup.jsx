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
      default: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", // gradient bg
      paper: "#1e1e2f", // form box background
    },
    primary: {
      main: "#7c4dff", // purple accent
    },
    text: {
      primary: "#ffffff",
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
          background: darkTheme.palette.background.default,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: darkTheme.palette.background.paper,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Sign up
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{ mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, borderRadius: 2 }}
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
