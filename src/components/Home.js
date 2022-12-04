import {
  Box,
  Toolbar,
} from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "password", headerName: "password", width: 150, editable: true },
];
const rows = [
  { id: "1", email: "test@gmail.com", password: "test@12345" },
  { id: "2", email: "test@gmail.com", password: "test@12345" },
  { id: "3", email: "test@gmail.com", password: "test@12345" },
  { id: "4", email: "test@gmail.com", password: "test@12345" },
  { id: "5", email: "test@gmail.com", password: "test@12345" },
  { id: "6", email: "test@gmail.com", password: "test@12345" },
];

const Home = (props) => {
  const grid = () => {
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    );
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Box sx={{ height: 400, width: "100%" }}>{grid()}</Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
