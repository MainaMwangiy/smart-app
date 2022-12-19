import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
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

export default function AddEmployee({ isDialogOpened, handleCloseDialog }) {
  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  const handleClose = () => {
    handleCloseDialog(false);
  };
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
    });

    try {
      await axios
        .post("http://localhost:4000/work/create-employee", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Dialog open={isDialogOpened} onClose={handleClose}>
        <form onSubmit={save}>
          <DialogTitle>{"Add New Employee"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!formData.fullname}
                  id="outlined-basic"
                  label="Fullname"
                  name="fullname"
                  value={formData.fullname || ""}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  hyperText="Name is required"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!formData.email}
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  value={formData.email || ""}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  hyperText="Email is required"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!formData.contact}
                  id="outlined-basic"
                  label="Contact"
                  name="contact"
                  value={formData.contact || ""}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  hyperText="Contact is required"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!formData.address}
                  id="outlined-basic"
                  label="Address"
                  name="address"
                  value={formData.address || ""}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  helperText="Address is required"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>{"Cancel"}</Button>
            <Button onSubmit={save} type="submit">
              {"Add Employee"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
