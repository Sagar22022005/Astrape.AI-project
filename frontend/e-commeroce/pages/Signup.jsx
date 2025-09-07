import React, { useState, useContext } from "react";
import api from "../src/api/api";
import { TextField, Button, Container, Typography } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Sign up</Typography>
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
      <Button variant="contained" sx={{ mt: 2 }} onClick={submit}>
        Sign up
      </Button>
    </Container>
  );
}
