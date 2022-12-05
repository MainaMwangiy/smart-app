import React, { useState } from "react";
import axios from "axios";
import { Grid, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const initialValues = Object.freeze({
  email: "",
  password: "",
});
import React from 'react'
import { Grid, TextField, Button } from "@mui/material";

export const Login = () => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const login = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      email: formData.email || "",
      password: formData.password || "",
    });
    console.log(data);
    try {
      await axios
        .post("http://localhost:4000/auth/login", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          // console.log(result);
          navigate("/", {state: formData});
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={login}>
      <Grid container spacing={2} sx={{ mt: 10, width: "50%", ml: "25%" }}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            value={formData.password || ""}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Button variant="contained" sx={{ m: 2 }} type="submit">
          {"Login"}
        </Button>
        <Link href="/register" component={"button"} sx={{}}> {"No account? Register"} </Link>
      </Grid>
    </form>
  );
};
