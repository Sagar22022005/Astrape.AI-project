import React, { useState, useContext } from "react";
import api from "../src/api/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // page background
      paper: "#1e1e1e", // container background
    },
    primary: {
      main: "#90caf9", // button color
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
      <Container
        maxWidth="sm"
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign up
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 3 }} onClick={submit}>
          Sign up
        </Button>
      </Container>
    </ThemeProvider>
  );
}
