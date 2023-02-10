import React, { useState } from "react";
import axios from "axios";
import { Grid, TextField, Button, Link, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMsal } from '@azure/msal-react';

const initialValues = Object.freeze({
  email: "",
  password: "",
});

export const Login = () => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  const { instance } = useMsal();
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.success) {
        Swal.fire({
          title: "Success",
          text: `${formData.email} Logged In Successfully`,
          icon: "success",
        });
        //set authenticated to true before navigating
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Login Failed",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Login Failed",
      });
    }
  };

  const microsoftLogin = async () => {
    await instance.loginRedirect({
      scopes: ['user.read']
    })
  }
  return (
    <Card sx={{ mt: 10, p: 4, width: "50%", ml: "25%" }}>
      <form onSubmit={login}>
        <Grid container spacing={2} >
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
          <div className="d-flex justify-content-between">
            <Button
              variant="contained"
              sx={{ m: 2 }}
              type="submit"
              className="justify-content-start"
            >
              {"Login"}
            </Button>
            <Link href="/Register" sx={{}} className="justify-content-end" variant="outlined" role="button" style={{ textDecoration: "none" }}>
              {"No account? Register"}
            </Link>
          </div>
        </Grid>
      </form>
    </Card>
  );
};
