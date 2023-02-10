import { Grid, TextField, Button, Link, Card, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
// import FormData from "form-data";

const initialValues = Object.freeze({
  email: "",
  password: "",
  cpassword: "",
});

export const Register = () => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const save = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      email: formData.email || "",
      password: formData.password || "",
    });

    try {
      await axios
        .post("http://localhost:4000/auth/register", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          Swal.fire({
            title: "Success",
            text: `${formData.email} Added successfully`,
            icon: "success",
          });
          navigate("/login");
        });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Registration Failed",
      });
    }
  };
  return (
    <Card sx={{ mt: isMobile ? 2 : 10, p: 4, width: isMobile ?  "80%" : "50%", ml: isMobile ? "0%" : "25%" }} >
      <form onSubmit={save}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} sm={12}>
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
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              name="cpassword"
              value={formData.cpassword || ""}
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
              {"Register"}
            </Button>
            <Link href="/Login" sx={{}} className="justify-content-end"  variant="outlined" role="button" style={{textDecoration: "none"}}>
              {"Has account? Login"}
            </Link>
          </div>
        </Grid>
      </form>
    </Card>
  );
};
