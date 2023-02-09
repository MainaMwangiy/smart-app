import { Box, Toolbar, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useMsal } from "@azure/msal-react";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { instance } = useMsal();
  const [username, setUsername] = useState('')
  useEffect(() => {
    const currentAccount = instance.getActiveAccount()
    if (currentAccount) {
      setUsername(currentAccount.username)
    }
  }, [instance])

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      setSelectedRows((rows) =>
        rows.filter((r) => !selectedRows.includes(r.id))
      );
      data.map((temp) => {
        if (temp.id === selectedRows[0]) {
          let i = selectedRows.indexOf(selectedRows[0])
          selectedRows[i] = temp._id
        }
      })
      let temp = JSON.stringify({
        id: selectedRows[0] || "",
      });
      await axios
        .post("http://localhost:4000/work/delete", temp, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                `'Your file has been deleted.'`,
                'success'
              )
              navigate("/")
            }
          })
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
    { field: "fullname", headerName: "fullname", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "contact", width: 200 },
    { field: "address", headerName: "address", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
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
          </>
        );
      },
    }, {
      field: "delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => {
        return (
          <>
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
      setLoading(true);
      await axios
        .get("http://localhost:4000/work/get-employee")
        .then((response) => {
          setData(response.data.employee);
          setLoading(false);
        }).catch(error => {
          setLoading(false)
        });
    };
    fetchData();
  }, []);

  const grid = () => {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelectedRows}
        selectionModel={selectedRows}
        loading={loading}
        components={{
          Toolbar: GridToolbar
        }}
      />
    );
  };

  return (
    <div>
      <Toolbar />
      <Grid container spacing={2} sx={{ mt: 10, width: "90%", ml: "5%" }}>
        <p>Welcome {username}</p>
        <Box sx={{ height: 630, width: "100%" }}>{grid()}</Box>
      </Grid>
    </div>
  );
};

export default Home;
