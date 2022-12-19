
import { Box, Toolbar, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";


const columns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "fullname", headerName: "fullname", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "contact", headerName: "contact", width: 150, editable: true },
  { field: "address", headerName: "address", width: 150, editable: true },
];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/work/get-employee")  
      console.log(result)
      setData(result.data.employee)
    }
    fetchData()
  }, []);
  const grid = () => {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    );
  };

  return (
    <div>
      <Toolbar />
      <Grid container spacing={2} sx={{ mt: 10, width: "50%", ml: "25%" }}>
        <Box sx={{ height: 400, width: "100%" }}>{grid()}</Box>
      </Grid>
    </div>
  );
};

export default Home;
