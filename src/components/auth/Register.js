import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
// import FormData from "form-data";

const initialValues = Object.freeze({
  email: "",
  password: "",
  cpassword: "",
});
import React from "react";

export const Register = () => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate()
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const save = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      email: formData.email || "",
      password: formData.password || ""
    })

    try {
      let result = await axios.post("http://localhost:4000/auth/register", data, {
        headers: {"Content-Type" : "application/json"}
      }).then(() => {
        navigate("/login")
      })
    } catch (error) {
      console.error(error.response.data);
    }
  };
  return (
    <form onSubmit={save}>
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
        <Button variant="contained" sx={{ m: 2 }} type="submit">
          {"Register"}
        </Button>
      </Grid>
    </form>
  );
};
