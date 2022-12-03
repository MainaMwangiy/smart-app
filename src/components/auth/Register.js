import { Paper, Card, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";

export const Register = () => {
    return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Button variant="contained" fullWidth >{"Register"}</Button>
        </Grid>
    )
};
