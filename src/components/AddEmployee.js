import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
// import FormData from "form-data";

const initialValues = Object.freeze({
  fullname: "",
  email: "",
  contact: "",
  address: "",
});

export const AddEmployee = () => {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate()
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const save = async (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      fullname: formData.fullname || "",
      email: formData.email || "",
      contact: formData.contact || "",
      address: formData.address || "",
    })

    try {
      await axios.post("http://localhost:4000/work/create-employee", data, {
        headers: {"Content-Type" : "application/json"}
      }).then(() => {
        navigate("/login")
      })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={save}>
      <Grid container spacing={2} sx={{ mt: 10, width: "50%", ml: "25%" }}>
      <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Fullname"
            name="fullname"
            value={formData.fullname || ""}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
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
            label="Contact"
            name="contact"
            value={formData.contact || ""}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Button variant="contained" sx={{ m: 2 }} type="submit">
          {"Add New"}
        </Button>
      </Grid>
    </form>
  );
};
