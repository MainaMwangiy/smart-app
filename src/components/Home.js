import { Box, Toolbar, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const onBtnClick = (e) => {
  e.stopPropagation();
};

const onEdit = (e) => {
  e.stopPropagation();
};

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "fullname", headerName: "fullname", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "contact", headerName: "contact", width: 150, editable: true },
  { field: "address", headerName: "address", width: 150, editable: true },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Button onClick={(e) => onEdit(e, params.row)} variant="contained">
            Edit
          </Button>
          <Button
            color={"error"}
            onClick={(e) => onBtnClick(e, params.row)}
            variant="contained"
            className="ml-2"
          >
            Delete
          </Button>
        </>
      );
    },
  },
];

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/work/get-employee");
      setData(result.data.employee);
    };
    fetchData();
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
      <Grid container spacing={2} sx={{ mt: 10, width: "90%", ml: "5%" }}>
        <Box sx={{ height: 450, width: "100%" }}>{grid()}</Box>
      </Grid>
    </div>
  );
};

export default Home;
