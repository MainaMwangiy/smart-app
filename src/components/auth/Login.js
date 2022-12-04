import React from 'react'
import { Grid, TextField, Button } from "@mui/material";

export const Login = () => {
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
    <Button variant="contained" fullWidth >{"Login"}</Button>
  </Grid>
  )
}
