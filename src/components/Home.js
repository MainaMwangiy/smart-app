import { Box, Toolbar, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setSelectedRows((rows) =>
        rows.filter((r) => !selectedRows.includes(r.id))
      );
      let data = JSON.stringify({
        id: selectedRows[0] || "",
      });
      await axios
        .post("http://localhost:4000/auth/delete", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          Swal.fire({ title: "Success", text: "Deleted", icon: "success" });
        });
    } catch (error) {
      Swal.fire({
        title: "Fail",
        text: "Failed to Delete Employee",
        icon: "error",
      });
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 280 },
    { field: "fullname", headerName: "fullname", width: 200},
    { field: "email", headerName: "Email", width: 200},
    { field: "contact", headerName: "contact", width: 200},
    { field: "address", headerName: "address", width: 200},
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) =>
                Swal.fire({ title: "Success", text: "Edited", icon: "success" })
              }
              variant="contained"
            >
              {"Edit"}
            </Button>
            <Button
              color={"error"}
              onClick={onDelete}
              variant="contained"
              className="ml-2"
            >
              {"Delete"}
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:4000/work/get-employee");
      if (!result) {
        return <div>Loading...</div>;
      }
      setData(result.data.employee);
    };
    fetchData();
  }, [data]);
  const grid = () => {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelectedRows}
        selectionModel={selectedRows}
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
