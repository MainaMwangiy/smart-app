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
import Swal from "sweetalert2";
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
    //Clear form after closing modal
    setFormData(initialValues)
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
          Swal.fire({
            title: "Success",
            text: `${formData.fullname} Added successfully`,
            icon: "success"
          })
          navigate("/");
          //close modal after adding new employee
          handleClose()
        });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `Failed to Add ${formData.fullname}`,
      });
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
